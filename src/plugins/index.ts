/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import { loadFonts } from '@/plugins/webfontloader'

export function registerPlugins () {
  loadFonts()
}
