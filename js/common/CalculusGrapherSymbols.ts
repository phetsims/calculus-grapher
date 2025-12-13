// Copyright 2022-2025, University of Colorado Boulder

/**
 * Symbols used throughout this simulation.
 *
 * This is also where MathSymbolFont is applied to symbols. By adding RichText markup to a symbol with
 * MathSymbolFont.getRichTextMarkup, all occurrences of that symbol will be rendered using MathSymbolFont.
 *
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../axon/js/DerivedProperty.js';
import MathSymbolFont from '../../../scenery-phet/js/MathSymbolFont.js';
import calculusGrapher from '../calculusGrapher.js';
import CalculusGrapherFluent from '../CalculusGrapherFluent.js';
import CalculusGrapherPreferences from './model/CalculusGrapherPreferences.js';

export default class CalculusGrapherSymbols {

  private constructor() {
    // Not intended for instantiation.
  }

  // No PhET-iO instrumentation is desired because the associated string Properties are already instrumented.
  // Showing the additional markup that is created around those strings provides no additional value.
  // See https://github.com/phetsims/calculus-grapher/issues/213
  public static readonly dStringProperty = MathSymbolFont.createDerivedProperty( CalculusGrapherFluent.symbol.dStringProperty ); // d
  public static readonly xStringProperty = MathSymbolFont.createDerivedProperty( CalculusGrapherFluent.symbol.xStringProperty ); // x
  public static readonly fStringProperty = MathSymbolFont.createDerivedProperty( CalculusGrapherFluent.symbol.fStringProperty ); // f
  public static readonly tStringProperty = MathSymbolFont.createDerivedProperty( CalculusGrapherFluent.symbol.tStringProperty ); // t

  public static readonly integral = MathSymbolFont.getRichTextMarkup( '\u222B', 'normal' );
  public static readonly prime = MathSymbolFont.getRichTextMarkup( '\'' );
  public static readonly doublePrime = MathSymbolFont.getRichTextMarkup( '"' );

  // Symbol for the variable (the horizontal axis), appears in the visual interface, contains RichText markup.
  public static readonly visualVariableSymbolProperty = new DerivedProperty(
    [ CalculusGrapherPreferences.functionVariableProperty, CalculusGrapherSymbols.xStringProperty, CalculusGrapherSymbols.tStringProperty ],
    ( functionVariable, xString, tString ) => functionVariable === 'x' ? xString : tString );

  // Symbol for the variable (the horizontal axis), appears in interactive descriptions, in plaintext format.
  public static readonly accessibleVariableSymbolProperty = new DerivedProperty(
    [ CalculusGrapherPreferences.functionVariableProperty, CalculusGrapherFluent.symbol.xStringProperty, CalculusGrapherFluent.symbol.tStringProperty ],
    ( functionVariable, xString, tString ) => functionVariable === 'x' ? xString : tString );
}

calculusGrapher.register( 'CalculusGrapherSymbols', CalculusGrapherSymbols );