

import AudioPlayer from "@/components/AudioPlayer";
import ExploreButton from "@/components/ExploreButton";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden flex justify-center items-center">
  {/* 🔹 Blurred Background Layer */}
  <div
    className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-xs -z-10"
    style={{ backgroundImage: "url('./pokebg.jpg')" }}
  ></div>

  
 <ExploreButton/>
  <div className="fixed bottom-4 right-4 z-50">
  <AudioPlayer/>
  </div>
</div>

  );
}
