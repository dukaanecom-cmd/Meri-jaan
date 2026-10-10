import { BirthdayData, initialBirthdayData } from '../data/birthdayData';

const LOCAL_STORAGE_KEY = 'janamdin_birthday_celebration_data_v1';

/**
 * Loads birthday data using multi-layer persistence:
 * 1. URL encoded payload (?data=...) for direct shareable links
 * 2. Server API (/api/birthday-data) saved to server disk
 * 3. Browser localStorage backup
 * 4. Fallback to initialBirthdayData
 */
export async function loadPersistedBirthdayData(): Promise<BirthdayData> {
  // Layer 1: Check URL search params for shared state
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const encoded = urlParams.get('bday');
    if (encoded) {
      const decoded = decodeURIComponent(atob(encoded));
      const parsed = JSON.parse(decoded);
      if (parsed && parsed.partnerName) {
        return { ...initialBirthdayData, ...parsed };
      }
    }
  } catch (err) {
    console.warn('Could not parse URL data parameter:', err);
  }

  // Layer 2: Check server disk storage
  try {
    const res = await fetch('/api/birthday-data');
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data && json.data.partnerName) {
        // Also sync to local storage
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(json.data));
        return { ...initialBirthdayData, ...json.data };
      }
    }
  } catch (err) {
    console.warn('Could not load from server API, checking local storage:', err);
  }

  // Layer 3: LocalStorage
  try {
    const local = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (local) {
      const parsed = JSON.parse(local);
      if (parsed && parsed.partnerName) {
        return { ...initialBirthdayData, ...parsed };
      }
    }
  } catch (err) {
    console.warn('Could not load from localStorage:', err);
  }

  return initialBirthdayData;
}

/**
 * Persists birthday data permanently:
 * 1. Saves to Server Disk (/api/birthday-data)
 * 2. Saves to localStorage
 */
export async function savePersistedBirthdayData(data: BirthdayData): Promise<boolean> {
  let serverSaved = false;

  // 1. Save to LocalStorage immediately
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.warn('Failed saving to localStorage:', err);
  }

  // 2. Save to Server Disk
  try {
    const res = await fetch('/api/birthday-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const json = await res.json();
      serverSaved = json.success;
    }
  } catch (err) {
    console.warn('Failed saving to server:', err);
  }

  return serverSaved;
}

/**
 * Uploads an image permanently to the server file system:
 * Returns the public URL (e.g., /uploads/photo_1_172856.jpg)
 */
export async function uploadPhotoFilePermanently(photoId: number, dataUrl: string): Promise<string> {
  try {
    const res = await fetch('/api/upload-photo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ photoId, dataUrl }),
    });
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.url) {
        return json.url;
      }
    }
  } catch (err) {
    console.warn('Upload API failed, falling back to base64 dataUrl:', err);
  }
  return dataUrl;
}

/**
 * Generates a shareable URL containing the current configuration
 */
export function generateShareableLink(data: BirthdayData): string {
  try {
    const cleanData = {
      partnerName: data.partnerName,
      partnerNickname: data.partnerNickname,
      senderName: data.senderName,
      age: data.age,
      birthDate: data.birthDate,
      heroSubtext: data.heroSubtext,
      letterParagraphs: data.letterParagraphs,
      secretWishText: data.secretWishText,
      // include photos with URLs
      photos: data.photos.map(p => ({
        id: p.id,
        title: p.title,
        date: p.date,
        location: p.location,
        caption: p.caption,
        imageUrl: p.imageUrl.startsWith('data:') ? '' : p.imageUrl,
        accentColor: p.accentColor,
      })),
    };
    const jsonStr = JSON.stringify(cleanData);
    const b64 = btoa(encodeURIComponent(jsonStr));
    const url = new URL(window.location.href);
    url.searchParams.set('bday', b64);
    return url.toString();
  } catch (err) {
    console.warn('Failed to generate shareable link:', err);
    return window.location.href;
  }
}
