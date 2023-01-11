// Copyright 2023, University of Colorado Boulder

/**
 * LabelledAncillaryTool is an ancillary toll with a label.
 *
 * @author Martin Veillette
 */

import Property from '../../../../axon/js/Property.js';
import StringProperty from '../../../../axon/js/StringProperty.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import calculusGrapher from '../../calculusGrapher.js';
import AncillaryTool, { AncillaryToolOptions } from './AncillaryTool.js';
import Curve from './Curve.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';

type SelfOptions = {
  label: string;
};

export type LabelledAncillaryToolOptions = SelfOptions & AncillaryToolOptions;

export default class LabelledAncillaryTool extends AncillaryTool {

  public readonly labelProperty: Property<string>;

  public constructor(
    integralCurve: Curve,
    originalCurve: Curve,
    derivativeCurve: Curve,
    secondDerivativeCurve: Curve,
    providedOptions: LabelledAncillaryToolOptions ) {

    const options = providedOptions;

    super( integralCurve, originalCurve, derivativeCurve, secondDerivativeCurve, options );

    this.labelProperty = new StringProperty( options.label, {
      tandem: options.tandem.createTandem( 'labelProperty' )
    } );
  }

  /**
   * Creates a specified number of LabelledAncillaryTool instances, with evenly spaced initialCoordinates,
   * and alphabetically-ordered tandem names.
   */
  public static createTools( totalNumber: number,
                             integralCurve: Curve,
                             originalCurve: Curve,
                             derivativeCurve: Curve,
                             secondDerivativeCurve: Curve,
                             parentTandem: Tandem, tandemSuffix: string ): LabelledAncillaryTool[] {

    const tools: LabelledAncillaryTool[] = [];
    for ( let i = 0; i < totalNumber; i++ ) {

      // convert integer to string 0->A, 1->B, etc
      const label = intToUppercaseLetter( i );

      // create a labelled ancillary tool with
      tools.push( new LabelledAncillaryTool( integralCurve, originalCurve, derivativeCurve, secondDerivativeCurve, {
        label: label,
        initialCoordinate: CalculusGrapherConstants.CURVE_X_RANGE.expandNormalizedValue( i / totalNumber ),
        tandem: parentTandem.createTandem( `${label}${tandemSuffix}` )
      } ) );
    }
    return tools;
  }
}

function intToUppercaseLetter( integer: number ): string {
  assert && assert( Number.isInteger( integer ), `must be an integer: ${integer}` );
  assert && assert( integer >= 0 && integer <= 25, `integer must range from 0 to 25: ${integer}` );
  return String.fromCharCode( integer + 'A'.charCodeAt( 0 ) );
}

calculusGrapher.register( 'LabelledAncillaryTool', LabelledAncillaryTool );
