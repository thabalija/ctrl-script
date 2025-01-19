import type { MetadataRoute } from "next";
import { BASE_URL } from "./_constants/baseUrl";
import { ROUTE } from "./_constants/route";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(ROUTE).map((route) => ({ url: `${BASE_URL}${route}` }));
}
