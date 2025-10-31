export function resolveVideoSource(url?: string | null) {
  if (typeof url !== 'string') {
    return undefined;
  }

  const trimmed = url.trim();

  if (!trimmed) {
    return undefined;
  }

  if (/^https?:\/\//i.test(trimmed) || /^file:\/\//i.test(trimmed) || trimmed.startsWith('content://')) {
    return { uri: trimmed } as const;
  }

  if (/^[A-Za-z]:\\\\/.test(trimmed)) {
    const normalised = trimmed.replace(/\\\\/g, '/');
    return { uri: `file:///${normalised}` } as const;
  }

  if (trimmed.startsWith('/')) {
    return { uri: `file://${trimmed}` } as const;
  }

  return { uri: trimmed } as const;
}

export function isStreamingUrl(url?: string | null) {
  if (typeof url !== 'string') {
    return false;
  }

  return /^https?:\/\//i.test(url.trim());
}
