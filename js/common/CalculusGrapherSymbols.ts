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

import MathSymbolFont from '../../../scenery-phet/js/MathSymbolFont.js';
import calculusGrapher from '../calculusGrapher.js';
import CalculusGrapherStrings from '../CalculusGrapherStrings.js';

export default class CalculusGrapherSymbols {

  private constructor() {
    // Not intended for instantiation.
  }

  // No PhET-iO instrumentation is desired, because the associated string Properties are already instrumented.
  // Showing the additional markup that is created around those strings provides no additional value.
  // See https://github.com/phetsims/calculus-grapher/issues/213
  public static readonly dStringProperty = MathSymbolFont.createDerivedProperty( CalculusGrapherStrings.symbol.dStringProperty ); // d
  public static readonly xStringProperty = MathSymbolFont.createDerivedProperty( CalculusGrapherStrings.symbol.xStringProperty ); // x
  public static readonly fStringProperty = MathSymbolFont.createDerivedProperty( CalculusGrapherStrings.symbol.fStringProperty ); // f
  public static readonly tStringProperty = MathSymbolFont.createDerivedProperty( CalculusGrapherStrings.symbol.tStringProperty ); // t

  public static readonly integral = MathSymbolFont.getRichTextMarkup( '\u222B', 'normal' );
  public static readonly prime = MathSymbolFont.getRichTextMarkup( '\'' );
  public static readonly doublePrime = MathSymbolFont.getRichTextMarkup( '"' );
}

calculusGrapher.register( 'CalculusGrapherSymbols', CalculusGrapherSymbols );