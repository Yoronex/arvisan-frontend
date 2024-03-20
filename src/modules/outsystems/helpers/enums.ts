export enum OutSystemsDataLayers {
  DOMAIN = 'Domain',
  APPLICATION = 'Application',
  LAYER = 'Layer',
  SUBLAYER = 'Sublayer',
  MODULE = 'Module',
}

/**
 * Source:
 *
 * Bouwers, Eric, Arie van Deursen, and Joost Visser. "Dependency profiles for software architecture
 * evaluations." 2011 27th IEEE International Conference on Software Maintenance (ICSM). IEEE, 2011.
 */
export enum DependencyProfileCategory {
  /** Modules which only have dependencies (either incoming or outgoing) involving modules
   *  inside the component. */
  HIDDEN = 'hidden', // Modules which only have dependencies (either incoming or outgoing

  /** modules which do not have outgoing dependencies to modules outside the component, but
   *  have incoming dependencies from modules outside the component. */
  INBOUND = 'inbound',

  /** modules which do not have incoming dependencies from modules outside the component, but
   *  have outgoing dependencies from modules outside the component. */
  OUTBOUND = 'outbound',

  /** modules which have dependencies (both incoming and outgoing) coming from/going to
   *  modules outside the component. */
  TRANSIT = 'transit',
}
