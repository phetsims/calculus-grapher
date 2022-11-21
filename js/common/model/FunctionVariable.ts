// Copyright 2022, University of Colorado Boulder

/**
 * FunctionVariable is a union type for the different variables that can appear in functions.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

export const FunctionVariableValues = [ 'x', 't' ] as const;
export type FunctionVariable = ( typeof FunctionVariableValues )[number];