export const CLOUDINARY_CLOUD_NAME = "ec5dvtkd";
export const CLOUDINARY_UPLOAD_PRESET = "ssgst_uploads";

// Upload a file, with optional context metadata (title, date)
export const uploadToCloudinary = async (
  file: File,
  folder: string,
  context?: Record<string, string>
): Promise<{ url: string; publicId: string }> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  formData.append("folder", folder);
  if (context) {
    // context format: "key=value|key2=value2"
    formData.append("context", Object.entries(context).map(([k, v]) => `${k}=${v}`).join("|"));
  }

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`,
    { method: "POST", body: formData }
  );
  if (!res.ok) throw new Error("Upload failed");
  const data = await res.json();
  return { url: data.secure_url, publicId: data.public_id };
};

// Fetch all resources in a folder via Cloudinary's search API (unsigned)
export const fetchFromCloudinary = async (folder: string): Promise<CloudinaryResource[]> => {
  const res = await fetch(
    `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/list/${folder}.json`,
    { cache: "no-store" }
  );
  if (!res.ok) return [];
  const data = await res.json();
  return (data.resources || []).map((r: any) => ({
    publicId: r.public_id,
    url: `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${r.public_id}`,
    context: r.context?.custom || {},
    createdAt: r.created_at,
  }));
};

export interface CloudinaryResource {
  publicId: string;
  url: string;
  context: Record<string, string>;
  createdAt: string;
}

// Delete a resource (requires signed request — we'll use a Cloudinary tag trick instead)
export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
  const formData = new FormData();
  formData.append("public_id", publicId);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/destroy`,
    { method: "POST", body: formData }
  );
};

// Upload a JSON config object. Returns the versioned URL which bypasses CDN cache.
export const uploadConfig = async (key: string, data: unknown): Promise<void> => {
  const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
  const file = new File([blob], `${key}.json`);
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  formData.append("public_id", `ssgst/config/${key}`);
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/raw/upload`,
    { method: "POST", body: formData }
  );
  if (res.ok) {
    const result = await res.json();
    // Store the versioned URL so fetchConfig can bypass CDN cache
    try { localStorage.setItem(`cfg_url_${key}`, result.secure_url); } catch {}
  }
};

// Fetch a JSON config object. Uses versioned URL from localStorage when available to bypass CDN cache.
export const fetchConfig = async <T>(key: string): Promise<T | null> => {
  try {
    let url: string;
    try {
      const versionedUrl = localStorage.getItem(`cfg_url_${key}`);
      url = versionedUrl ?? `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/raw/upload/ssgst/config/${key}.json`;
    } catch {
      url = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/raw/upload/ssgst/config/${key}.json`;
    }
    const res = await fetch(`${url}?t=${Date.now()}`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json() as T;
  } catch {
    return null;
  }
};
