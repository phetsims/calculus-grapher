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

const CurveLabelsNode = {

  // label for f(x)
  getOriginalLabel(): Node {

    const labelStringProperty = new DerivedProperty(
      [ CalculusGrapherSymbols.fStringProperty, CalculusGrapherSymbols.xStringProperty ],
      ( f, x ) => {
        return `${f}(${x})`;
      } );

    return new RichText( labelStringProperty );
  },

  // label for df/dx
  getDerivativeLabel(): Node {

    const numeratorString = CalculusGrapherSymbols.dfStringProperty;
    const denominatorString = CalculusGrapherSymbols.dxStringProperty;

    return getFractionLabel( numeratorString, denominatorString );
  },

  // label for d^2f/dx^2
  getSecondDerivativeLabel(): Node {

    const hairSpaceString = '\u200A';

    const numeratorStringProperty = new DerivedProperty(
      [ CalculusGrapherSymbols.dStringProperty, CalculusGrapherSymbols.fStringProperty ],
      ( d, f ) => {

        // string for d^2 f , we need a hairspace to prevent the superscript to overlap with d
        return `${d}${hairSpaceString}<sup style="font-size:10pt; font-family:Times">2</sup>${f}`;
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

  // label for \int f(x) dx
  getIntegralLabel(): Node {

    // integral sign
    const integrationString = '\u222B';


    const labelStringProperty = new DerivedProperty(
      [ CalculusGrapherSymbols.fStringProperty,
        CalculusGrapherSymbols.xStringProperty,
        CalculusGrapherSymbols.dxStringProperty ],
      ( f, x, dx ) => {

        // string for  \int f(x) dx
        return `${integrationString} ${f}(${x}) ${dx} `;
      } );

    return new RichText( labelStringProperty );
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
      new RichText( numeratorStringProperty ),

      // horizontal line between numerator and denominator, resized automatically by VBox
      new HSeparator( {
        stroke: 'black',
        lineWidth: 0.5
      } ),

      // denominator
      new RichText( denominatorStringProperty )
    ]
  } );
}

calculusGrapher.register( 'CurveLabelsNode', CurveLabelsNode );
export default CurveLabelsNode;
