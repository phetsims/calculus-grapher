// Copyright 2022, University of Colorado Boulder

/**
 * Symbols used to label graphs and checkboxes.
 *
 * This is also where MathSymbolFont is applied to symbols. By adding RichText markup to a symbol with
 * MathSymbolFont.getRichTextMarkup, all occurrences of that symbol will be rendered using MathSymbolFont.
 *
 * @author Martin Veillette
 */

import MathSymbolFont from '../../../scenery-phet/js/MathSymbolFont.js';
import calculusGrapher from '../calculusGrapher.js';
import CalculusGrapherStrings from '../CalculusGrapherStrings.js';

const CalculusGrapherSymbols = {

  dStringProperty: MathSymbolFont.createDerivedProperty( CalculusGrapherStrings.symbol.dStringProperty ), // d
  xStringProperty: MathSymbolFont.createDerivedProperty( CalculusGrapherStrings.symbol.xStringProperty ), // x
  fStringProperty: MathSymbolFont.createDerivedProperty( CalculusGrapherStrings.symbol.fStringProperty ) // f
};


calculusGrapher.register( 'CalculusGrapherSymbols', CalculusGrapherSymbols );
export default CalculusGrapherSymbols;
