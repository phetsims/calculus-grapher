// Copyright 2023, University of Colorado Boulder

/**
 * PointLabel is the model element for a vertical line tool.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Curve from './Curve.js';
import calculusGrapher from '../../calculusGrapher.js';
import { Color, ColorProperty } from '../../../../scenery/js/imports.js';
import LabeledAncillaryTool, { LabeledAncillaryToolOptions } from './LabeledAncillaryTool.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import Range from '../../../../dot/js/Range.js';

const TANDEM_SUFFIX = 'PointLabel';

type SelfOptions = {
  pointColor: Color;
};

type PointLabelOptions = SelfOptions & LabeledAncillaryToolOptions;

export default class PointLabel extends LabeledAncillaryTool {

  public readonly pointColorProperty: ColorProperty;

  public constructor( integralCurve: Curve, originalCurve: Curve, derivativeCurve: Curve, secondDerivativeCurve: Curve,
                      providedOptions: PointLabelOptions ) {

    const options = providedOptions;

    super( integralCurve, originalCurve, derivativeCurve, secondDerivativeCurve, options );

    this.pointColorProperty = new ColorProperty( options.pointColor, {
      tandem: options.tandem.createTandem( 'pointColorProperty' )
    } );
  }

  //TODO https://github.com/phetsims/calculus-grapher/issues/144 duplication with VerticalLine.createMultiple
  /**
   * Creates a specified number of PointLabel instances, with evenly spaced initialCoordinates,
   * and alphabetically-ordered tandem names.
   */
  public static createMultiple( numberOfTools: number, integralCurve: Curve, originalCurve: Curve,
                                derivativeCurve: Curve, secondDerivativeCurve: Curve, xRange: Range,
                                pointColor: Color, parentTandem: Tandem ): PointLabel[] {

    const tools: PointLabel[] = [];
    for ( let i = 0; i < numberOfTools; i++ ) {

      // convert integer to string 0->A, 1->B, etc
      const label = PointLabel.intToUppercaseLetter( i );

      // create the tool
      tools.push( new PointLabel( integralCurve, originalCurve, derivativeCurve, secondDerivativeCurve, {
        label: label,
        pointColor: pointColor,
        x: xRange.expandNormalizedValue( i / ( numberOfTools - 1 ) ),
        tandem: parentTandem.createTandem( `${label}${TANDEM_SUFFIX}` )
      } ) );
    }
    return tools;
  }
}

calculusGrapher.register( 'PointLabel', PointLabel );
