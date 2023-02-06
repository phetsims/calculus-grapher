// Copyright 2023, University of Colorado Boulder

/**
 * LabeledAncillaryTool is the base class for ancillary tools that have a label.
 *
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { Text } from '../../../../scenery/js/imports.js';
import Property from '../../../../axon/js/Property.js';
import StringProperty from '../../../../axon/js/StringProperty.js';
import calculusGrapher from '../../calculusGrapher.js';
import AncillaryTool, { AncillaryToolOptions } from './AncillaryTool.js';
import Curve from './Curve.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';

type SelfOptions = {
  label: string;
};

export type LabeledAncillaryToolOptions = SelfOptions & AncillaryToolOptions;

export default class LabeledAncillaryTool extends AncillaryTool {

  // The string to be displayed on the tool
  public readonly stringProperty: Property<string>;

  protected constructor(
    integralCurve: Curve,
    originalCurve: Curve,
    derivativeCurve: Curve,
    secondDerivativeCurve: Curve,
    providedOptions: LabeledAncillaryToolOptions ) {

    const options = providedOptions;

    super( integralCurve, originalCurve, derivativeCurve, secondDerivativeCurve, options );

    this.stringProperty = new StringProperty( options.label, {
      tandem: options.tandem.createTandem( Text.STRING_PROPERTY_TANDEM_NAME )
    } );
  }

  /**
   * Converts an integer in the range 0-25 to an uppercase letter in the range A-Z.
   * This is used to generate labels for tools.
   */
  public static intToUppercaseLetter( integer: number ): string {
    assert && assert( Number.isInteger( integer ), `must be an integer: ${integer}` );
    assert && assert( integer >= 0 && integer <= 25, `integer must range from 0 to 25: ${integer}` );
    return String.fromCharCode( integer + 'A'.charCodeAt( 0 ) );
  }

  /**
   * Creates a specified number of tool instances, with evenly-spaced x coordinates, and alphabetically-ordered labels.
   * @param numberOfTools
   * @param createTool - x is the tool's initial x coordinate, label is the string used to label the tool
   */
  protected static createLabeledAncillaryTools<T extends LabeledAncillaryTool>(
    numberOfTools: number, createTool: ( x: number, label: string ) => T ): T[] {

    const tools: T[] = [];
    for ( let i = 0; i < numberOfTools; i++ ) {

      // evenly spaced, but avoiding CURVE_X_RANGE.min and CURVE_X_RANGE.max, where they would overlap the
      // edges of the chart
      const x = CalculusGrapherConstants.CURVE_X_RANGE.expandNormalizedValue( ( i + 1 ) / ( numberOfTools + 1 ) );

      // convert integer to uppercase character: 0->A, 1->B, etc
      const label = LabeledAncillaryTool.intToUppercaseLetter( i );

      // create the tool
      tools.push( createTool( x, label ) );
    }
    return tools;
  }
}

calculusGrapher.register( 'LabeledAncillaryTool', LabeledAncillaryTool );
