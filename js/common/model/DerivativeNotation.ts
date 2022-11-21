// Copyright 2022, University of Colorado Boulder

/**
 * Notation is a union type for the different notations used to express functions.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

export const DerivativeNotationValues = [ 'lagrange', 'leibniz' ] as const;
export type DerivativeNotation = ( typeof DerivativeNotationValues )[number];