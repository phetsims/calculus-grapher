// Copyright 2022-2023, University of Colorado Boulder

/**
 * GraphTypeLabelNode is the view representation for graph labels in 'Calculus Grapher'
 *
 * @author Martin Veillette
 */

import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import { HSeparator, Node, NodeOptions, RichText, VBox } from '../../../../scenery/js/imports.js';
import calculusGrapher from '../../calculusGrapher.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { DerivativeNotation, FunctionVariable } from '../CalculusGrapherQueryParameters.js';
import CalculusGrapherPreferences from '../model/CalculusGrapherPreferences.js';
import optionize from '../../../../phet-core/js/optionize.js';
import GraphType from '../model/GraphType.js';
import CalculusGrapherSymbols from '../CalculusGrapherSymbols.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';

const HAIR_SPACE_STRING = '\u200A';
const NOMINAL_FONT_SIZE = CalculusGrapherConstants.GRAPH_LABEL_FONT.numericSize;

// Possible prime symbols that can appear after the 'f' in 'f(x)'
const PrimeStringValues = [ '', CalculusGrapherSymbols.prime, CalculusGrapherSymbols.doublePrime ] as const;
type PrimeString = ( typeof PrimeStringValues )[number];

type FontSizeOptions = {

  // This value determines the size of the symbols 'f', 'd', 'x', and 't' when they do not appear in a fraction.
  // Typically, you'll want to set nominalFontSize, and the other sizes will be computed proportionally.
  nominalFontSize?: number;

  // Leave these alone (use the defaults), unless you need to tweak for specific cases.
  integralSymbolFontSize?: number; // for the integral symbol
  limitsFontSize?: number; // for the upper and lower limits on the integral symbol
  fractionFontSize?: number; // for fractions like df/dx
};

type SelfOptions = {
  derivativeNotationProperty?: TReadOnlyProperty<DerivativeNotation>;
  functionVariableProperty?: TReadOnlyProperty<FunctionVariable>;
  fontSizeOptions?: FontSizeOptions;
};

type GraphTypeLabelNodeOptions = SelfOptions & NodeOptions;

export default class GraphTypeLabelNode extends Node {

  public constructor( graphType: GraphType, providedOptions?: GraphTypeLabelNodeOptions ) {

    const options = optionize<GraphTypeLabelNodeOptions, SelfOptions, NodeOptions>()( {

      // SelfOptions
      derivativeNotationProperty: CalculusGrapherPreferences.derivativeNotationProperty,
      functionVariableProperty: CalculusGrapherPreferences.functionVariableProperty,
      fontSizeOptions: {
        nominalFontSize: NOMINAL_FONT_SIZE,
        integralSymbolFontSize: 1.5 * NOMINAL_FONT_SIZE,
        limitsFontSize: 0.5 * NOMINAL_FONT_SIZE,
        fractionFontSize: 0.75 * NOMINAL_FONT_SIZE
      }
    }, providedOptions );

    super( options );

    // get variable as a StringProperty
    const variableStringProperty = getVariableStringProperty( options.functionVariableProperty );

    // create and add content for the node, based on graphType, notation and variable
    let labelNode = getLabelNode( graphType, options.derivativeNotationProperty.value, variableStringProperty, options.fontSizeOptions );
    this.addChild( labelNode );

    options.derivativeNotationProperty.link( derivationNotation => {

      // remove and dispose previous labelNode
      labelNode.dispose();

      // create and add new label
      labelNode = getLabelNode( graphType, derivationNotation, variableStringProperty, options.fontSizeOptions );
      this.addChild( labelNode );
    } );
  }
}

/**
 * Gets the label for the specified graph type.
 */
function getLabelNode( graphType: GraphType,
                       derivativeNotation: DerivativeNotation,
                       variableStringProperty: TReadOnlyProperty<string>,
                       fontSizeOptions: FontSizeOptions ): Node {

  if ( graphType === GraphType.INTEGRAL ) {
    return getIntegral( variableStringProperty, fontSizeOptions );
  }
  else if ( graphType === GraphType.ORIGINAL ) {
    return getOriginal( variableStringProperty, fontSizeOptions );
  }
  else if ( graphType === GraphType.DERIVATIVE ) {
    return getDerivative( derivativeNotation, variableStringProperty, fontSizeOptions );
  }
  else if ( graphType === GraphType.SECOND_DERIVATIVE ) {
    return getSecondDerivative( derivativeNotation, variableStringProperty, fontSizeOptions );
  }
  else {
    throw new Error( 'Unsupported graphType' );
  }
}

/**
 * label for f(x), f'(x) and f"(x)
 */
function getPrimeLabel( variableStringProperty: TReadOnlyProperty<string>, primeString: PrimeString,
                        fontSizeOptions: FontSizeOptions ): Node {

  const labelStringProperty = new DerivedProperty(
    [ CalculusGrapherSymbols.fStringProperty, variableStringProperty ],
    ( f, x ) => {
      return `${f}${HAIR_SPACE_STRING}${primeString}(${x})`;
    } );

  return new RichText( labelStringProperty, {
    font: new PhetFont( fontSizeOptions.nominalFontSize ),
    maxWidth: 50
  } );
}

/**
 * label for f(x)
 */
function getOriginal( variableStringProperty: TReadOnlyProperty<string>, fontSizeOptions: FontSizeOptions ): Node {
  return getPrimeLabel( variableStringProperty, '', fontSizeOptions );
}

/**
 * label for f'(x)
 */
function getLagrangeDerivative( variableStringProperty: TReadOnlyProperty<string>,
                                fontSizeOptions: FontSizeOptions ): Node {
  return getPrimeLabel( variableStringProperty, CalculusGrapherSymbols.prime, fontSizeOptions );
}

/**
 * label for f''(x)
 */
function getLagrangeSecondDerivative( variableStringProperty: TReadOnlyProperty<string>,
                                      fontSizeOptions: FontSizeOptions ): Node {
  return getPrimeLabel( variableStringProperty, CalculusGrapherSymbols.doublePrime, fontSizeOptions );
}

/**
 * label for df/dx or df/dt
 */
function getLeibnizDerivative( variableStringProperty: TReadOnlyProperty<string>,
                               fontSizeOptions: FontSizeOptions ): Node {

  const numeratorStringProperty = new DerivedProperty(
    [ CalculusGrapherSymbols.dStringProperty, CalculusGrapherSymbols.fStringProperty ],
    ( d, f ) => {

      // string for df
      return `${d}${HAIR_SPACE_STRING}${f}`;
    } );

  const denominatorStringProperty =
    new DerivedProperty(
      [ CalculusGrapherSymbols.dStringProperty, variableStringProperty ],
      ( d, x ) => {

        // string for dx
        return `${d}${x}`;
      } );
  return getFractionLabel( numeratorStringProperty, denominatorStringProperty, fontSizeOptions );
}

/**
 * label for d^2f/dx^2 or d^2f/dt^2
 */
function getLeibnizSecondDerivative( variableStringProperty: TReadOnlyProperty<string>,
                                     fontSizeOptions: FontSizeOptions ): Node {

  const numeratorStringProperty = new DerivedProperty(
    [ CalculusGrapherSymbols.dStringProperty, CalculusGrapherSymbols.fStringProperty ],
    ( d, f ) => {

      // string for d^2 f , we need a hairspace to prevent the superscript to overlap with d
      return `${d}${HAIR_SPACE_STRING}<sup "style="font-size:10pt; font-family:Times>2</sup>${f}`;
    } );

  const denominatorStringProperty =
    new DerivedProperty(
      [ CalculusGrapherSymbols.dStringProperty, variableStringProperty ],
      ( d, x ) => {

        // string for dx^2 , the superscript is downsized but in the same Family at the math symbols
        return `${d}${x}<sup style="font-size:10pt; font-family:Times">2</sup>`;
      } );

  return getFractionLabel( numeratorStringProperty, denominatorStringProperty, fontSizeOptions );
}

/**
 * Gets the derivative label, appropriate for the chose derivative notation.
 */
function getDerivative( derivativeNotation: DerivativeNotation, variableStringProperty: TReadOnlyProperty<string>,
                        fontSizeOptions: FontSizeOptions ): Node {
  if ( derivativeNotation === 'leibniz' ) {
    return getLeibnizDerivative( variableStringProperty, fontSizeOptions );
  }
  else {
    return getLagrangeDerivative( variableStringProperty, fontSizeOptions );
  }
}

/**
 * Gets the second derivative label, appropriate for the chose derivative notation.
 */
function getSecondDerivative( derivativeNotation: DerivativeNotation, variableStringProperty: TReadOnlyProperty<string>,
                              fontSizeOptions: FontSizeOptions ): Node {
  if ( derivativeNotation === 'leibniz' ) {
    return getLeibnizSecondDerivative( variableStringProperty, fontSizeOptions );
  }
  else {
    return getLagrangeSecondDerivative( variableStringProperty, fontSizeOptions );
  }
}

/**
 * label for \int_0^x f(x) dx or \int_0^t f(t) dt
 */
function getIntegral( variableStringProperty: TReadOnlyProperty<string>, fontSizeOptions: FontSizeOptions ): Node {

  // The symbol for integral
  const integralSymbolNode = new RichText( CalculusGrapherSymbols.integral, {
    font: new PhetFont( fontSizeOptions.integralSymbolFontSize ),
    maxWidth: 25
  } );

  const limitsFont = new PhetFont( fontSizeOptions.limitsFontSize );

  // lower limit of integral
  const lowerBoundNode = new RichText( '0', {
    font: limitsFont,
    maxWidth: 25
  } );

  // upper limit of integral
  const upperBoundNode = new RichText( variableStringProperty, {
    font: limitsFont,
    maxWidth: 25
  } );

  // integrand of integral: f(x)dx
  const integrandStringProperty = new DerivedProperty(
    [ CalculusGrapherSymbols.fStringProperty,
      variableStringProperty,
      CalculusGrapherSymbols.dStringProperty ],
    ( f, x, d ) => {

      // string for  f(x) dx
      return `${f}${HAIR_SPACE_STRING}(${x}) ${d}${x} `;
    } );
  const integrandNode = new RichText( integrandStringProperty, {
    font: new PhetFont( fontSizeOptions.nominalFontSize ),
    maxWidth: 50
  } );

  // laying out the various nodes
  lowerBoundNode.left = integralSymbolNode.right - 2;
  lowerBoundNode.bottom = integralSymbolNode.bottom + 3;
  upperBoundNode.left = integralSymbolNode.right + 2;
  upperBoundNode.top = integralSymbolNode.top - 5;
  integrandNode.left = upperBoundNode.right + 2;
  integrandNode.centerY = integralSymbolNode.centerY;

  return new Node( { children: [ lowerBoundNode, upperBoundNode, integrandNode, integralSymbolNode ] } );
}

/**
 * Gets a fraction node, made of a numerator and a denominator separated by a horizontal line.
 */
function getFractionLabel( numeratorStringProperty: TReadOnlyProperty<string>,
                           denominatorStringProperty: TReadOnlyProperty<string>,
                           fontSizeOptions: FontSizeOptions ): Node {
  const fractionFont = new PhetFont( fontSizeOptions.fractionFontSize );
  return new VBox( {
    children: [

      // numerator
      new RichText( numeratorStringProperty, { font: fractionFont, maxWidth: 50 } ),

      // horizontal line between numerator and denominator, resized automatically by VBox
      new HSeparator( { stroke: 'black', lineWidth: 0.5 } ),

      // denominator
      new RichText( denominatorStringProperty, { font: fractionFont, maxWidth: 50 } )
    ]
  } );
}

/**
 * Get the function variable as a StringProperty (rather than StringEnumeration).
 */
function getVariableStringProperty( functionVariableProperty: TReadOnlyProperty<FunctionVariable> ):
  TReadOnlyProperty<string> {
  return new DerivedProperty(
    [ functionVariableProperty,
      CalculusGrapherSymbols.xStringProperty,
      CalculusGrapherSymbols.tStringProperty ],
    ( functionVariable, xString, tString ) =>
      ( functionVariable === 'x' ) ? xString : tString
  );
}

calculusGrapher.register( 'GraphTypeLabelNode', GraphTypeLabelNode );
