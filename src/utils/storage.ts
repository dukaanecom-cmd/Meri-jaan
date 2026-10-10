import { BirthdayData, initialBirthdayData } from '../data/birthdayData';

const LOCAL_STORAGE_KEY = 'janamdin_birthday_celebration_data_v1';

/**
 * Loads birthday data safely across GitHub Pages, static hosting, and full-stack servers:
 * 1. URL encoded payload (?bday=...) for direct shareable links
 * 2. Browser localStorage (instant, 100% works on GitHub Pages without server)
 * 3. Server API (/api/birthday-data) if backend server is running
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

  // Layer 2: LocalStorage (Works 100% on GitHub Pages, Netlify, Vercel)
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

  // Layer 3: Check server disk storage (if running in full-stack Node environment)
  try {
    const res = await fetch('/api/birthday-data');
    const contentType = res.headers.get('content-type');
    if (res.ok && contentType && contentType.includes('application/json')) {
      const json = await res.json();
      if (json.success && json.data && json.data.partnerName) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(json.data));
        return { ...initialBirthdayData, ...json.data };
      }
    }
  } catch (err) {
    // Expected on static hosts like GitHub Pages, seamlessly fallback to default
  }

  return initialBirthdayData;
}

/**
 * Persists birthday data permanently:
 * 1. Saves to localStorage (instant persistence on GitHub Pages)
 * 2. Saves to Server Disk (/api/birthday-data) if server is available
 */
export async function savePersistedBirthdayData(data: BirthdayData): Promise<boolean> {
  let savedLocally = false;

  // 1. Save to LocalStorage immediately
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    savedLocally = true;
  } catch (err) {
    console.warn('Failed saving to localStorage:', err);
  }

  // 2. Try saving to Server Disk if full-stack backend exists
  try {
    const res = await fetch('/api/birthday-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const json = await res.json();
      return json.success || savedLocally;
    }
  } catch (err) {
    // Static host (GitHub Pages) uses localStorage, which is already saved
  }

  return savedLocally;
}

/**
 * Uploads an image permanently:
 * On server: saves file to disk (/uploads/...)
 * On static GitHub Pages: uses optimized Data URL in localStorage
 */
export async function uploadPhotoFilePermanently(photoId: number, dataUrl: string): Promise<string> {
  try {
    const res = await fetch('/api/upload-photo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ photoId, dataUrl }),
    });
    const contentType = res.headers.get('content-type');
    if (res.ok && contentType && contentType.includes('application/json')) {
      const json = await res.json();
      if (json.success && json.url) {
        return json.url;
      }
    }
  } catch (err) {
    // Static host fallback: dataUrl in localStorage
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
