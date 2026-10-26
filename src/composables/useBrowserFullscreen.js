export async function enterBrowserFullscreen() {
  if (document.fullscreenElement || !document.documentElement.requestFullscreen) return

  try {
    await document.documentElement.requestFullscreen()
  } catch (error) {
    console.warn('[Fullscreen] Could not enter browser fullscreen mode', error)
  }
}

export async function exitBrowserFullscreen() {
  if (!document.fullscreenElement || !document.exitFullscreen) return

  try {
    await document.exitFullscreen()
  } catch (error) {
    console.warn('[Fullscreen] Could not exit browser fullscreen mode', error)
  }
}
