import { Haptics, ImpactStyle } from "@capacitor/haptics";

export async function vibrateOnAction() {
  await Haptics.impact({ style: ImpactStyle.Medium });
}
