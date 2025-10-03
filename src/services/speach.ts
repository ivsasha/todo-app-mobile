import { Capacitor } from "@capacitor/core";
import { SpeechRecognition } from "@capacitor-community/speech-recognition";

export async function startListening(): Promise<string[]> {
  if (Capacitor.getPlatform() === "web") {
    return startListeningWeb();
  }

  const available = await SpeechRecognition.available();
  if (!available.available) throw new Error("Speech recognition not available");

  await SpeechRecognition.requestPermissions();

  return new Promise((resolve) => {
    SpeechRecognition.start({ language: "uk-UA", popup: true });

    SpeechRecognition.addListener("partialResults", (data) => {
      resolve(data.matches);
    });
  });
}

function startListeningWeb(): Promise<string[]> {
  return new Promise((resolve, reject) => {
    // Use type assertions to avoid TypeScript errors
    const SpeechRecognitionWeb =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionWeb) {
      reject(new Error("Web Speech API not supported in this browser"));
      return;
    }

    const recognition = new SpeechRecognitionWeb();
    recognition.lang = "uk-UA";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      resolve([transcript]);
    };

    recognition.onerror = (err: any) => reject(err);

    recognition.start();
  });
}
