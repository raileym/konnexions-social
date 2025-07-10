export const cleanTextForTTS = (text: string) => {
  const updatedText = text
    .replace(/^\d+\.\s*/gm, '')      // remove leading numbers like "1. " from each line
    .replace(/\*\*/g, '')            // remove double asterisks
    .replace(/\*/g, '')              // remove single asterisks
    .replace(/#/g, '');              // remove hash marks
  return updatedText;
}
