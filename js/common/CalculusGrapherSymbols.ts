// Copyright 2022-2023, University of Colorado Boulder

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

const CalculusGrapherSymbols = {

  // No PhET-iO instrumentation is desired, because the associated string Properties are already instrumented.
  // Showing the additional markup that is created around those strings provides no additional value.
  // See https://github.com/phetsims/calculus-grapher/issues/213
  dStringProperty: MathSymbolFont.createDerivedProperty( CalculusGrapherStrings.symbol.dStringProperty ), // d
  xStringProperty: MathSymbolFont.createDerivedProperty( CalculusGrapherStrings.symbol.xStringProperty ), // x
  fStringProperty: MathSymbolFont.createDerivedProperty( CalculusGrapherStrings.symbol.fStringProperty ), // f
  tStringProperty: MathSymbolFont.createDerivedProperty( CalculusGrapherStrings.symbol.tStringProperty ), // t

  integral: MathSymbolFont.getRichTextMarkup( '\u222B', 'normal' ),
  prime: MathSymbolFont.getRichTextMarkup( '\'' ),
  doublePrime: MathSymbolFont.getRichTextMarkup( '"' )
};

calculusGrapher.register( 'CalculusGrapherSymbols', CalculusGrapherSymbols );
export default CalculusGrapherSymbols;
