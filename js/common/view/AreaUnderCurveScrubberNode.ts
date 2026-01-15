// Copyright 2022-2026, University of Colorado Boulder

/**
 * AreaUnderCurveScrubberNode is a subclass of ScrubberNode. In addition to setting the appropriate colors for
 * the scrubber, it adds a horizontal 'accumulation line' from x=0 to the x position of the scrubber.
 *
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import { toFixedNumber } from '../../../../dot/js/util/toFixedNumber.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import Line from '../../../../scenery/js/nodes/Line.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherFluent from '../../CalculusGrapherFluent.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import CalculusGrapherSymbols from '../CalculusGrapherSymbols.js';
import AreaUnderCurveScrubber from '../model/AreaUnderCurveScrubber.js';
import ScrubberNode, { ScrubberNodeOptions } from './ScrubberNode.js';

type SelfOptions = EmptySelfOptions;

type AreaUnderCurveScrubberNodeOptions = SelfOptions &
  PickRequired<ScrubberNodeOptions, 'lineTop' | 'lineBottom' | 'tandem' | 'visibleProperty'>;

export default class AreaUnderCurveScrubberNode extends ScrubberNode {

  private readonly areaUnderCurveScrubber: AreaUnderCurveScrubber;

  public constructor( areaUnderCurveScrubber: AreaUnderCurveScrubber,
                      chartTransform: ChartTransform,
                      providedOptions: AreaUnderCurveScrubberNodeOptions ) {

    const options = optionize<AreaUnderCurveScrubberNodeOptions, SelfOptions, ScrubberNodeOptions>()( {

      // ScrubberNodeOptions
      handleColor: areaUnderCurveScrubber.colorProperty,
      lineStroke: areaUnderCurveScrubber.colorProperty,
      handleAccessibleNameProperty: CalculusGrapherFluent.a11y.areaUnderCurveTool.accessibleNameStringProperty,
      handleAccessibleHelpTextProperty: CalculusGrapherFluent.a11y.areaUnderCurveTool.accessibleHelpText.createProperty( {
        variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty
      } )
    }, providedOptions );

    super( areaUnderCurveScrubber, chartTransform, options );

    this.areaUnderCurveScrubber = areaUnderCurveScrubber;

    // Horizontal 'accumulation line' that extends from x=0 to the drag handle's position
    const accumulationLine = new Line( 0, 0, this.handleNode.centerX, 0, {
      stroke: areaUnderCurveScrubber.colorProperty,
      lineWidth: 3,
      pickable: false // optimization, see https://github.com/phetsims/calculus-grapher/issues/210
    } );
    this.addChild( accumulationLine );
    accumulationLine.moveToBack();

    // Resizes the horizontal line to match the drag handle's x position.
    this.handleNode.boundsProperty.link( () => {
      accumulationLine.x2 = this.handleNode.centerX;
      accumulationLine.centerY = this.handleNode.centerY;
    } );
  }

  public override doAccessibleObjectResponse(): void {

    const integralValue = toFixedNumber( this.areaUnderCurveScrubber.integralCurvePointProperty.value.y, CalculusGrapherConstants.AREA_DESCRIPTION_DECIMALS );

    this.addAccessibleObjectResponse( CalculusGrapherFluent.a11y.areaUnderCurveTool.accessibleObjectResponse.format( {
      sign: integralValue === 0 ? 'zero' : integralValue > 0 ? 'positive' : 'negative',
      variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty,
      x: toFixedNumber( this.areaUnderCurveScrubber.xProperty.value, CalculusGrapherConstants.X_DESCRIPTION_DECIMALS ),
      absoluteIntegralValue: Math.abs( integralValue ),
      integralValue: integralValue
    } ) );
  }

  /**
   * Creates an icon for the area-under-curve scrubber.
   */
  public static override createIcon(): Node {
    return ScrubberNode.createIcon( CalculusGrapherColors.integralCurveStrokeProperty );
  }
}

calculusGrapher.register( 'AreaUnderCurveScrubberNode', AreaUnderCurveScrubberNode );