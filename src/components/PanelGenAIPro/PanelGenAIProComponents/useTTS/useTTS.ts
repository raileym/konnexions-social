import { useRef, useState } from 'react'
import type { DebugLog, Language } from '@cknTypes/types'
import { fetchTTS } from '@PanelGenAIProComponents/fetchTTS/fetchTTS'
import { cleanTextForTTS } from '@components/Util'
import { useAppContext } from '@context/AppContext/AppContext'
import { usePaywall } from '@hooks/usePaywall/usePaywall'

type SpeakArgs = {
  text: string
  speaker: string
  gender: string
  index?: number
  onEnd?: () => void
}

type UseTTSProps = {
  useCloudTTS: boolean
  cutoff: boolean
  store?: (index: number, value: string) => void
  language: Language
  debugLog: DebugLog
}

const LANG_TAG_MAP: Record<string, string> = {
  es: 'es-ES',
  en: 'en-US',
  fr: 'fr-FR',
  it: 'it-IT'
}

export function useTTS({
  useCloudTTS,
  cutoff,
  store,
  language,
  debugLog
}: UseTTSProps) {
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const fetchingRef = useRef(false)

  const { paywall, clientUUID } = useAppContext()
  const { refreshPaywall } = usePaywall()

  const stop = () => {
    window.speechSynthesis.cancel()
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      audioRef.current = null
    }
  }

  const speak = async ({ text, speaker, gender, index = 0, onEnd }: SpeakArgs) => {
    stop();

    // Clean text here before TTS
    if (useCloudTTS && !cutoff && paywall.paywall_package_yellow_remaining > 0) {
      if (audioUrl) {
        const audio = new Audio(audioUrl);
        audioRef.current = audio;
        audio.onended = onEnd ?? (() => {});
        audio.play();
        return;
      }

      if (fetchingRef.current) return;
      fetchingRef.current = true;

      try {
        const { audioUrl, decremented } = await fetchTTS({
          debugLog,
          speaker,
          language,
          text,
          gender,
          paywall,
          cutoff,
          clientUUID
        });
        if (decremented) {
          refreshPaywall()
        }
        if (audioUrl) {
          setAudioUrl(audioUrl);
          if (store) store(index, audioUrl);
          const audio = new Audio(audioUrl);
          audioRef.current = audio;
          audio.onended = onEnd ?? (() => {});
          audio.play();
        }
      } finally {
        fetchingRef.current = false;
      }
    } else {
      const processedText = cleanTextForTTS(text);
      const utterance = new SpeechSynthesisUtterance(processedText);
      const voices = window.speechSynthesis.getVoices();
      const langTag = LANG_TAG_MAP[language] || 'en-US';

      const match = voices.find(v =>
        gender === 'f'
          ? v.lang === langTag && v.name.toLowerCase().includes('female')
          : v.lang === langTag && v.name.toLowerCase().includes('male')
      );

      utterance.voice = match || voices.find(v => v.lang === langTag) || null;
      utterance.lang = langTag;
      utterance.rate = 0.9;
      utterance.onend = onEnd ?? (() => {});
      window.speechSynthesis.speak(utterance);
    }
  }


  return { audioUrl, speak, stop }
}
