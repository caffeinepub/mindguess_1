interface CharacterAvatarProps {
  character?: { name: string; category: string };
  showName?: boolean;
}

export function CharacterAvatar({ character, showName = true }: CharacterAvatarProps) {
  // Use Luffy avatar if character name matches, otherwise use generic mystical avatar
  const avatarSrc = character?.name === "Monkey D. Luffy" 
    ? "/assets/generated/luffy-avatar.dim_400x400.png"
    : "/assets/generated/avatar-mystical.dim_512x512.png";

  return (
    <div className="flex justify-center mb-8">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-50 animate-pulse" />
        <img
          src={avatarSrc}
          alt={character ? character.name : "Mystical Avatar"}
          className="relative w-48 h-48 rounded-full border-4 border-purple-400/50 shadow-2xl object-cover"
        />
        {character && showName && (
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2 rounded-full border-2 border-purple-300 shadow-lg">
            <p className="text-white font-semibold text-sm whitespace-nowrap">
              {character.name}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
