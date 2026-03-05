// Copyright 2026, University of Colorado Boulder

/**
 * AreaUnderCurveToolDescriber creates accessible responses for the Area Under Curve Tool.
 *
 * In code and PhET-iO API, this is referred to as a "scrubber".  But "tool" is used here
 * to align with core-description terminology.
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
import ExplorationToolDescriber from './ExplorationToolDescriber.js';

export default class AreaUnderCurveToolDescriber extends ExplorationToolDescriber {

  public constructor( private readonly areaUnderCurveScrubber: AreaUnderCurveScrubber,
                      private readonly integralCurveLayerVisibleProperty: TReadOnlyProperty<boolean>,
                      private readonly primaryCurveLayerVisibleProperty: TReadOnlyProperty<boolean>
  ) {
    // All fields are defined and initialized via constructor params.
    super( areaUnderCurveScrubber );
  }

  /**
   * Gets the accessible object response that describes the tool's x-coordinate and what its vertical line intersects.
   */
  public override getAccessibleObjectResponse(): string {
    return CalculusGrapherFluent.a11y.areaUnderCurveTool.accessibleObjectResponse.pattern.format( {
      xPhrase: this.getXPhrase(),
      integralPhrase: this.getIntegralPhrase(),
      areaPhrase: this.getAreaPhrase()
    } );
  }

  /**
   * Gets the phrase that describes the tool's intersection with the integral graph.
   * The integral is described as a y-value or hidden.
   */
  private getIntegralPhrase(): string {
    let integralPhrase: string;
    if ( this.integralCurveLayerVisibleProperty.value ) {
      // y-value
      integralPhrase = CalculusGrapherFluent.a11y.areaUnderCurveTool.accessibleObjectResponse.integralPhrase.integralValue.format( {
        variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty.value,
        value: toFixedNumber( this.areaUnderCurveScrubber.integralCurvePointProperty.value.y, CalculusGrapherConstants.Y_DESCRIPTION_DECIMALS )
      } );
    }
    else {
      // hidden
      integralPhrase = CalculusGrapherFluent.a11y.areaUnderCurveTool.accessibleObjectResponse.integralPhrase.hiddenStringProperty.value;
    }
    return integralPhrase;
  }

  /**
   * Gets the phrase that describes the area under the primary curve from 0 to the tool's x-coordinate.
   * Area is described as zero, positive, negative, or hidden.
   */
  private getAreaPhrase(): string {
    let areaPhrase: string;
    if ( this.primaryCurveLayerVisibleProperty.value ) {
      const area = toFixedNumber( this.areaUnderCurveScrubber.integralCurvePointProperty.value.y, CalculusGrapherConstants.AREA_DESCRIPTION_DECIMALS );
      if ( area === 0 ) {
        // zero
        areaPhrase = CalculusGrapherFluent.a11y.areaUnderCurveTool.accessibleObjectResponse.areaPhrase.zeroStringProperty.value;
      }
      else if ( area > 0 ) {
        // positive
        areaPhrase = CalculusGrapherFluent.a11y.areaUnderCurveTool.accessibleObjectResponse.areaPhrase.positive.format( {
          absoluteArea: Math.abs( area )
        } );
      }
      else {
        // negative
        areaPhrase = CalculusGrapherFluent.a11y.areaUnderCurveTool.accessibleObjectResponse.areaPhrase.negative.format( {
          absoluteArea: Math.abs( area )
        } );
      }
    }
    else {
      // hidden
      areaPhrase = CalculusGrapherFluent.a11y.areaUnderCurveTool.accessibleObjectResponse.areaPhrase.hiddenStringProperty.value;
    }
    return areaPhrase;
  }
}

calculusGrapher.register( 'AreaUnderCurveToolDescriber', AreaUnderCurveToolDescriber );