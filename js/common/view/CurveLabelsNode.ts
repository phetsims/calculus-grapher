// Copyright 2022, University of Colorado Boulder

/**
 * LabelsNode is the view representation graph labels for 'Calculus Grapher'
 *
 * @author Martin Veillette
 */

import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import { HSeparator, Node, RichText, VBox } from '../../../../scenery/js/imports.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherSymbols from '../CalculusGrapherSymbols.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';

const DEFAULT_FONT = new PhetFont( 16 );
const INTEGRAL_SYMBOL_FONT = new PhetFont( 24 );
const UPPER_LOWER_BOUNDS_FONT = new PhetFont( 8 );
const FRACTION_FONT = new PhetFont( 12 );

const CurveLabelsNode = {

  // label for f(x)
  getOriginalLabel(): Node {

    const labelStringProperty = new DerivedProperty(
      [ CalculusGrapherSymbols.fStringProperty, CalculusGrapherSymbols.xStringProperty ],
      ( f, x ) => {
        return `${f}(${x})`;
      } );

    return new RichText( labelStringProperty, { font: DEFAULT_FONT } );
  },

  // label for df/dx
  getDerivativeLabel(): Node {

    const hairSpaceString = '\u200A';

    const numeratorStringProperty = new DerivedProperty(
      [ CalculusGrapherSymbols.dStringProperty, CalculusGrapherSymbols.fStringProperty ],
      ( d, f ) => {

        // string for df
        return `${d}${hairSpaceString}${f}`;
      } );

    const denominatorStringProperty =
      new DerivedProperty(
        [ CalculusGrapherSymbols.dStringProperty, CalculusGrapherSymbols.xStringProperty ],
        ( d, x ) => {

          // string for dx
          return `${d}${x}`;
        } );
    return getFractionLabel( numeratorStringProperty, denominatorStringProperty );
  },

  // label for d^2f/dx^2
  getSecondDerivativeLabel(): Node {

    const hairSpaceString = '\u200A';

    const numeratorStringProperty = new DerivedProperty(
      [ CalculusGrapherSymbols.dStringProperty, CalculusGrapherSymbols.fStringProperty ],
      ( d, f ) => {

        // string for d^2 f , we need a hairspace to prevent the superscript to overlap with d
        return `${d}${hairSpaceString}<sup "style="font-size:10pt; font-family:Times>2</sup>${f}`;
      } );

    const denominatorStringProperty =
      new DerivedProperty(
        [ CalculusGrapherSymbols.dStringProperty, CalculusGrapherSymbols.xStringProperty ],
        ( d, x ) => {

          // string for dx^2 , the superscript is downsized but in the same Family at the math symbols
          return `${d}${x}<sup style="font-size:10pt; font-family:Times">2</sup>`;
        } );

    return getFractionLabel( numeratorStringProperty, denominatorStringProperty );
  },

  // label for \int_0^x f(t) dt
  getIntegralLabel(): Node {

    // The symbol for integral
    const integralSymbolNode = new RichText( CalculusGrapherSymbols.integral, {
      font: INTEGRAL_SYMBOL_FONT
    } );

    // lower bound of integral
    const lowerBoundNode = new RichText( '0', {
      font: UPPER_LOWER_BOUNDS_FONT
    } );

    // upper bound of integral
    const upperBoundNode = new RichText( CalculusGrapherSymbols.xStringProperty, {
      font: UPPER_LOWER_BOUNDS_FONT
    } );

    // integrand of integral: f(t)dt
    const integrandStringProperty = new DerivedProperty(
      [ CalculusGrapherSymbols.fStringProperty,
        CalculusGrapherSymbols.tStringProperty,
        CalculusGrapherSymbols.dStringProperty ],
      ( f, t, d ) => {

        // string for  f(t) dt
        return `${f}(${t}) ${d}${t} `;
      } );
    const integrandNode = new RichText( integrandStringProperty, { font: DEFAULT_FONT } );

    // laying out the various nodes
    lowerBoundNode.left = integralSymbolNode.right - 2;
    lowerBoundNode.bottom = integralSymbolNode.bottom + 3;
    upperBoundNode.left = integralSymbolNode.right + 2;
    upperBoundNode.top = integralSymbolNode.top - 5;
    integrandNode.left = upperBoundNode.right + 2;
    integrandNode.centerY = integralSymbolNode.centerY;

    return new Node( { children: [ lowerBoundNode, upperBoundNode, integrandNode, integralSymbolNode ] } );
  }
};

/*
 Returns scenery node representing a fraction made of a numerator and a denominator separated by a horizontal line
 */
function getFractionLabel( numeratorStringProperty: TReadOnlyProperty<string>,
                           denominatorStringProperty: TReadOnlyProperty<string> ): Node {
  return new VBox( {
    children: [

      // numerator
      new RichText( numeratorStringProperty, { font: FRACTION_FONT } ),

      // horizontal line between numerator and denominator, resized automatically by VBox
      new HSeparator( {
        stroke: 'black',
        lineWidth: 0.5
      } ),

      // denominator
      new RichText( denominatorStringProperty, { font: FRACTION_FONT } )
    ]
  } );
}

calculusGrapher.register( 'CurveLabelsNode', CurveLabelsNode );
export default CurveLabelsNode;
