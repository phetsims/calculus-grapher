// Copyright 2022, University of Colorado Boulder

/**
 * CurveLabelNode is the view representation for graph labels in 'Calculus Grapher'
 *
 * @author Martin Veillette
 */

import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import { HSeparator, Node, NodeOptions, RichText, VBox } from '../../../../scenery/js/imports.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherSymbols from '../CalculusGrapherSymbols.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { GraphType } from './CalculusGrapherScreenView.js';
import { DerivativeNotation, FunctionVariable } from '../CalculusGrapherQueryParameters.js';
import CalculusGrapherPreferences from '../model/CalculusGrapherPreferences.js';
import optionize from '../../../../phet-core/js/optionize.js';
import StringEnumerationProperty from '../../../../axon/js/StringEnumerationProperty.js';

const HAIR_SPACE_STRING = '\u200A';
const DEFAULT_FONT = new PhetFont( 16 );
const INTEGRAL_SYMBOL_FONT = new PhetFont( 24 );
const UPPER_LOWER_BOUNDS_FONT = new PhetFont( 8 );
const FRACTION_FONT = new PhetFont( 12 );

type SelfOptions = {
  graphType?: GraphType;
  derivativeNotationProperty?: StringEnumerationProperty<DerivativeNotation>;
  functionVariableProperty?: StringEnumerationProperty<FunctionVariable>;
};

export type CurveLabelNodeOptions = SelfOptions & NodeOptions;

export default class CurveLabelNode extends Node {

  public constructor( providedOptions: CurveLabelNodeOptions ) {

    const options = optionize<CurveLabelNodeOptions, SelfOptions, NodeOptions>()( {
      graphType: 'original',
      derivativeNotationProperty: CalculusGrapherPreferences.derivativeNotationProperty,
      functionVariableProperty: CalculusGrapherPreferences.functionVariableProperty
    }, providedOptions );

    super( options );

    // get variable as a StringProperty
    const variableStringProperty = this.getVariableStringProperty( options.functionVariableProperty );

    options.derivativeNotationProperty.link( derivationNotation => {
      this.removeAllChildren();
      const content = this.getContent( options.graphType, derivationNotation, variableStringProperty );
      this.addChild( content );
    } );
  }

  public getContent( graphType: GraphType,
                     derivativeNotation: DerivativeNotation,
                     variableStringProperty: TReadOnlyProperty<string> ): Node {

    if ( graphType === 'integral' ) {
      return this.getIntegral( variableStringProperty );
    }
    else if ( graphType === 'original' ) {
      return this.getOriginal( variableStringProperty );
    }
    else if ( graphType === 'derivative' ) {
      return this.getDerivative( derivativeNotation, variableStringProperty );
    }
    else if ( graphType === 'secondDerivative' ) {
      return this.getSecondDerivative( derivativeNotation, variableStringProperty );
    }
    else {
      throw new Error( 'Unsupported graphType' );
    }
  }

  // label for f(x), f'(x) and f''(x)
  public getPrimeLabel( variableStringProperty: TReadOnlyProperty<string>, primeString: string ): Node {

    const labelStringProperty = new DerivedProperty(
      [ CalculusGrapherSymbols.fStringProperty, variableStringProperty ],
      ( f, x ) => {
        return `${f}${primeString}(${x})`;
      } );

    return new RichText( labelStringProperty, { font: DEFAULT_FONT } );
  }

  // label for f(x)
  private getOriginal( variableStringProperty: TReadOnlyProperty<string> ): Node {

    // insert a thin space between f and the parenthesis
    return this.getPrimeLabel( variableStringProperty, HAIR_SPACE_STRING );
  }

  // label for f'(x)
  private getLagrangeDerivative( variableStringProperty: TReadOnlyProperty<string> ): Node {

    // space followed by a single apostrophe
    const singleApostrophe = ' \'';

    return this.getPrimeLabel( variableStringProperty, singleApostrophe );
  }

  // label for f"(x)
  private getLagrangeSecondDerivative( variableStringProperty: TReadOnlyProperty<string> ): Node {

    // space followed by a double apostrophe
    const doubleApostrophe = ' "';

    return this.getPrimeLabel( variableStringProperty, doubleApostrophe );
  }

  // label for df/dx, or df/dt
  private getLeibnizDerivative( variableStringProperty: TReadOnlyProperty<string> ): Node {

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
    return this.getFractionLabel( numeratorStringProperty, denominatorStringProperty );
  }

  // label for d^2f/dx^2 or d^2f/dt^2
  private getLeibnizSecondDerivative( variableStringProperty: TReadOnlyProperty<string> ): Node {

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

    return this.getFractionLabel( numeratorStringProperty, denominatorStringProperty );
  }

  // get derivative label, appropriate for the chose derivative notation
  private getDerivative( derivativeNotation: DerivativeNotation, variableStringProperty: TReadOnlyProperty<string> ): Node {
    if ( derivativeNotation === 'leibniz' ) {
      return this.getLeibnizDerivative( variableStringProperty );
    }
    else {
      return this.getLagrangeDerivative( variableStringProperty );
    }
  }

  // get second derivative label, appropriate for the chose derivative notation
  private getSecondDerivative( derivativeNotation: DerivativeNotation, variableStringProperty: TReadOnlyProperty<string> ): Node {
    if ( derivativeNotation === 'leibniz' ) {
      return this.getLeibnizSecondDerivative( variableStringProperty );
    }
    else {
      return this.getLagrangeSecondDerivative( variableStringProperty );
    }
  }

  // label for \int_0^x f(x) dx or \int_0^t f(t) dt
  private getIntegral( variableStringProperty: TReadOnlyProperty<string> ): Node {

    // The symbol for integral
    const integralSymbolNode = new RichText( CalculusGrapherSymbols.integral, {
      font: INTEGRAL_SYMBOL_FONT
    } );

    // lower bound of integral
    const lowerBoundNode = new RichText( '0', {
      font: UPPER_LOWER_BOUNDS_FONT
    } );

    // upper bound of integral
    const upperBoundNode = new RichText( variableStringProperty, {
      font: UPPER_LOWER_BOUNDS_FONT
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

  /*
   Returns scenery node representing a fraction made of a numerator and a denominator separated by a horizontal line
   */
  private getFractionLabel( numeratorStringProperty: TReadOnlyProperty<string>,
                            denominatorStringProperty: TReadOnlyProperty<string> ): Node {
    return new VBox( {
      children: [

        // numerator
        new RichText( numeratorStringProperty, { font: FRACTION_FONT } ),

        // horizontal line between numerator and denominator, resized automatically by VBox
        new HSeparator( { stroke: 'black', lineWidth: 0.5 } ),

        // denominator
        new RichText( denominatorStringProperty, { font: FRACTION_FONT } )
      ]
    } );
  }

  // get the function variable as a StringProperty (rather than StringEnumeration)
  private getVariableStringProperty( functionVariableProperty: StringEnumerationProperty<FunctionVariable> ):
    TReadOnlyProperty<string> {
    return new DerivedProperty(
      [ functionVariableProperty,
        CalculusGrapherSymbols.xStringProperty,
        CalculusGrapherSymbols.tStringProperty ],
      ( functionVariable, xString, tString ) =>
        ( functionVariable === 'x' ) ? xString : tString
    );
  }
}
calculusGrapher.register( 'CurveLabelNode', CurveLabelNode );
