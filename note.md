... createFlexLesson

    **** CHECK *********************************************************************************

    if (paywall.paywall_package_green_remaining < 0) {
      console.log('Not enough green packages available')
      return
    }

    const translationResult = await runPipelineCbClient({
      lesson: dialogLesson,
      pipelineType: PIPELINE_TYPE.TRANSLATION
    })

        *************************************************************************************
        INTO THE CLOUD -- HIDING THE DETAILS OF ACTION

        Pivots on pipelineType => pipelineConfig

        *************************************************************************************

        ... runPipelineCbClient
        
        const res = await fetch('/.netlify/functions/run-pipeline-cb-background', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            lesson,
            pipelineType
          })
        })

            *************************************************************************************
            PIPELINE - DRAFT, REVIEW, RESOLVE
            *************************************************************************************

            ... run-pipeline-cb-background

            await runPipelineCb({
              lesson,
              pipelineConfig
            })

                ... runPipelineCb

                *************************************************************************************
                DRAFT
                *************************************************************************************

                const moduleDraft = await getModule_cb({
                  testMode: false,
                  moduleName: pipelineConfig.draftModule,
                  lesson
                })

                    *************************************************************************************
                    INTO THE CLOUD -- RE-ENTRY (THOUGH NOT REALLY)
                    *************************************************************************************

                    ... getModule_cb

                    const res = await fetch(`${baseURL}/.netlify/functions/genai-module-cb`, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        testMode,
                        lesson,
                        moduleName
                      })
                    })

                        ... genai-module-cb

                        **** CHECK *********************************************************************************

                        // 👇 If your model calls are gated (e.g., by yellow count), enforce here
                        if (paywall.paywall_package_green_remaining <= 0) {
                          return {
                            statusCode: 404,
                            body: JSON.stringify({ error: 'No green package credits remaining' })
                          }
                        }

                        ;({ prompt, fieldCount, errorLabel } = getPrompt_cb({
                          moduleName,
                          lesson,
                          errors: []
                        }))

                        -- FIRST TRY
                        
                        response = await fetchOpenAI({ lessonId: lesson.id, clientUUID: lesson.clientUUID, prompt })

                        let validModule = validateModule({
                          response,
                          errorLabel,
                          fieldCount,
                          language: lesson.targetLanguage,
                          moduleName
                        })

                        -- SECOND TRY WITH ERROR QUALIFICATIONS (IF NECESSARY)
                        
                        if (!validModule.success) {
                          ;({ prompt, fieldCount, errorLabel } = getPrompt_cb({
                            moduleName,
                            lesson,
                            errors: validModule.errors ?? []
                          }))

                          response = await fetchOpenAI({ lessonId: lesson.id, clientUUID: lesson.clientUUID, prompt })

                          validModule = validateModule({
                            response,
                            errorLabel,
                            fieldCount,
                            language: lesson.targetLanguage,
                            moduleName
                          })
                        }

                        **** DECREMENT *********************************************************************************
                        
                        if (paywall.paywall_package_green_remaining > 0) {
                          await upsertPaywall(lesson.clientUUID, {
                            ...paywall,
                            paywall_package_green_remaining: paywall.paywall_package_green_remaining - 1
                          })
                        }


                const { error: draftError } = await supabase.rpc('ckn_upsert_module', {
                  arg_lesson_id: lesson.id,
                  arg_module_name: pipelineConfig.draftModule,
                  arg_module_content: draftContentWithDuration
                })

                *************************************************************************************
                REVIEW
                *************************************************************************************

                const moduleReviewed = await getModule_cb({
                  lesson: lessonDraft,
                  moduleName: pipelineConfig.reviewModule,
                  testMode: false
                })

                    ... getModule_cb

                const { error: reviewError } = await supabase.rpc('ckn_upsert_module', {
                  arg_lesson_id: lesson.id,
                  arg_module_name: pipelineConfig.reviewModule,
                  arg_module_content: reviewContentWithDuration
                })

                *************************************************************************************
                RESOLVE
                *************************************************************************************

                const { linesResolved, linesResolutions } = pipelineConfig.resolve({
                  reviewLines: lessonReviewed[pipelineConfig.reviewModule].lines,
                  draftLines: lessonReviewed[pipelineConfig.draftModule].lines
                })

                const { error: resolveError } = await supabase.rpc('ckn_upsert_module', {
                  arg_lesson_id: lesson.id,
                  arg_module_name: pipelineConfig.resolveModule,
                  arg_module_content: resolvedModule
                })

        const responseLesson = await pollPipelineModules({lesson, pipelineConfig: pipelineConfigMap[pipelineType]})
        if (!responseLesson ) {
          return null
        }
