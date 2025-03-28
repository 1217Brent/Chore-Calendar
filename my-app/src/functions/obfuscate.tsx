const obfuscateId = (id: string) => {
    return btoa(id); // Base64 encode the ID
  };

export default obfuscateId;