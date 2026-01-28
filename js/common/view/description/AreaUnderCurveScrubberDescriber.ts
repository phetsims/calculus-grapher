// Copyright 2026, University of Colorado Boulder

/**
 * AreaUnderCurveScrubberDescriber creates accessible responses for the Area Under Curve scrubber.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { TReadOnlyProperty } from '../../../../../axon/js/TReadOnlyProperty.js';
import { toFixedNumber } from '../../../../../dot/js/util/toFixedNumber.js';
import calculusGrapher from '../../../calculusGrapher.js';
import CalculusGrapherFluent from '../../../CalculusGrapherFluent.js';
import CalculusGrapherConstants from '../../CalculusGrapherConstants.js';
import CalculusGrapherSymbols from '../../CalculusGrapherSymbols.js';
import AreaUnderCurveScrubber from '../../model/AreaUnderCurveScrubber.js';

export default class AreaUnderCurveScrubberDescriber {

  public constructor( private readonly areaUnderCurveScrubber: AreaUnderCurveScrubber,
                      private readonly integralCurveLayerVisibleProperty: TReadOnlyProperty<boolean>,
                      private readonly primaryCurveLayerVisibleProperty: TReadOnlyProperty<boolean>
  ) {
    // All fields are defined and initialized via constructor params.
  }

  /**
   * Gets the accessible object response that describes the Area Under Curve scrubber and what it intersects.
   */
  public getAccessibleObjectResponse(): string {

    const integralValue = toFixedNumber( this.areaUnderCurveScrubber.integralCurvePointProperty.value.y, CalculusGrapherConstants.AREA_DESCRIPTION_DECIMALS );

    return CalculusGrapherFluent.a11y.areaUnderCurveTool.accessibleObjectResponse.format( {
      sign: integralValue === 0 ? 'zero' : integralValue > 0 ? 'positive' : 'negative',
      variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty,
      x: toFixedNumber( this.areaUnderCurveScrubber.xProperty.value, CalculusGrapherConstants.X_DESCRIPTION_DECIMALS ),
      absoluteIntegralValue: Math.abs( integralValue ),
      integralValue: integralValue
    } );
  }
}

calculusGrapher.register( 'AreaUnderCurveScrubberDescriber', AreaUnderCurveScrubberDescriber );