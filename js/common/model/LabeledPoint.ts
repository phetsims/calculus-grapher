// Copyright 2023, University of Colorado Boulder

/**
 * LabeledPoint is the model element for a labeled point on a curve.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Curve from './Curve.js';
import calculusGrapher from '../../calculusGrapher.js';
import { Color, ColorProperty } from '../../../../scenery/js/imports.js';
import LabeledAncillaryTool, { LabeledAncillaryToolOptions } from './LabeledAncillaryTool.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';

const TANDEM_SUFFIX = 'Point';

type SelfOptions = {
  pointColor: Color;
};

type LabeledPointOptions = SelfOptions & LabeledAncillaryToolOptions;

export default class LabeledPoint extends LabeledAncillaryTool {

  public readonly pointColorProperty: ColorProperty;

  public constructor( integralCurve: Curve, originalCurve: Curve, derivativeCurve: Curve, secondDerivativeCurve: Curve,
                      providedOptions: LabeledPointOptions ) {

    const options = providedOptions;

    super( integralCurve, originalCurve, derivativeCurve, secondDerivativeCurve, options );

    this.pointColorProperty = new ColorProperty( options.pointColor, {
      tandem: options.tandem.createTandem( 'pointColorProperty' )
    } );
  }

  //TODO https://github.com/phetsims/calculus-grapher/issues/144 duplication with VerticalLine.createMultiple
  /**
   * Creates a specified number of LabeledPoint instances, with evenly spaced initialCoordinates,
   * and alphabetically-ordered tandem names.
   */
  public static createMultiple( numberOfTools: number, integralCurve: Curve, originalCurve: Curve,
                                derivativeCurve: Curve, secondDerivativeCurve: Curve,
                                parentTandem: Tandem ): LabeledPoint[] {

    const tools: LabeledPoint[] = [];
    for ( let i = 0; i < numberOfTools; i++ ) {

      // convert integer to string 0->A, 1->B, etc
      const label = LabeledPoint.intToUppercaseLetter( i );

      // create the tool
      tools.push( new LabeledPoint( integralCurve, originalCurve, derivativeCurve, secondDerivativeCurve, {
        label: label,
        pointColor: CalculusGrapherColors.originalCurveStrokeProperty.value,
        x: CalculusGrapherConstants.CURVE_X_RANGE.expandNormalizedValue( ( i + 1 ) / ( numberOfTools + 1 ) ),
        tandem: parentTandem.createTandem( `${label}${TANDEM_SUFFIX}` )
      } ) );
    }
    return tools;
  }
}

calculusGrapher.register( 'LabeledPoint', LabeledPoint );
