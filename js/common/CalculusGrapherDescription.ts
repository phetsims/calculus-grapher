// Copyright 2025, University of Colorado Boulder

/**
 * CalculusGrapherDescription is a collection of static properties that are used to describe the sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../axon/js/DerivedProperty.js';
import calculusGrapher from '../calculusGrapher.js';
import CalculusGrapherFluent from '../CalculusGrapherFluent.js';
import CalculusGrapherPreferences from './model/CalculusGrapherPreferences.js';

export default class CalculusGrapherDescription {

  private constructor() {
    // Not intended for instantiation.
  }

  // Localized variable that describes the x-axis, either 'x' or 't'. Set based on the 'Variable' preference.
  public static readonly variableStringProperty = new DerivedProperty( [
      CalculusGrapherPreferences.functionVariableProperty,
      CalculusGrapherFluent.symbol.xStringProperty,
      CalculusGrapherFluent.symbol.tStringProperty ],
    ( functionVariable, xString, tString ) => ( functionVariable === 'x' ) ? xString : tString );
}

calculusGrapher.register( 'CalculusGrapherDescription', CalculusGrapherDescription );