/**
 * Created by Louka MB. <https://github.com/mblouka>
 * 06/01/2024
 */

/**
 * Entrypoint for client-side JavaScript.
 */

import { hydrateRoot } from "react-dom/client"

import { Aqueducts } from "@/components/Aqueduct.tsx"

/**
 * This is an empty web component used to selectively hydrate
 * portions of the webpage. Efficient? Not really, but React
 * is stupid and doesn't allow per-element hydration.
 */
class AshleyHydrationRoot extends HTMLElement {
  constructor() {
    super()
  }
}
customElements.define("ashley-aqueduct", AshleyHydrationRoot)

/**
 * Hydate some of the stuff we need interactivity for.
 * TODO: Invoke getParams for _each_ component? Would that be
 * overkill for our purposes/too heavy?
 */
async function hydrate() {
  for (const [name, { Component, getParams }] of Object.entries(Aqueducts)) {
    ;(async () => {
      let params = undefined
      if (getParams !== undefined) {
        params = await getParams()
      }

      // Find all the roots with the name.
      const roots = document.querySelectorAll(`ashley-aqueduct[name=${name}]`)
      for (const root of roots) {
        hydrateRoot(root, Component(params ?? {}))
      }
    })().catch(console.error)
  }
}

hydrate().catch(console.error)