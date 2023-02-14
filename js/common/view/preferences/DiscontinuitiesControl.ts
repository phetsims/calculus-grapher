// Copyright 2022-2023, University of Colorado Boulder

/**
 * DiscontinuitiesControl is the control in the Preferences dialog for selecting how discontinuities in curves
 * will be displayed. It is a labeled group of radio buttons.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../../axon/js/Property.js';
import { combineOptions } from '../../../../../phet-core/js/optionize.js';
import { Circle, HBox, Line, LineOptions, Node, Text } from '../../../../../scenery/js/imports.js';
import RectangularRadioButton from '../../../../../sun/js/buttons/RectangularRadioButton.js';
import RectangularRadioButtonGroup, { RectangularRadioButtonGroupItem } from '../../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import calculusGrapher from '../../../calculusGrapher.js';
import CalculusGrapherColors from '../../CalculusGrapherColors.js';
import CalculusGrapherStrings from '../../../CalculusGrapherStrings.js';
import { ConnectDiscontinuities, ConnectDiscontinuitiesValues } from '../../CalculusGrapherQueryParameters.js';
import Tandem from '../../../../../tandem/js/Tandem.js';
import CalculusGrapherConstants from '../../CalculusGrapherConstants.js';

export default class DiscontinuitiesControl extends HBox {

  private readonly disposeDiscontinuitiesControl: () => void;

  public constructor( connectDiscontinuitiesProperty: Property<ConnectDiscontinuities>, tandem: Tandem ) {

    const labelText = new Text( CalculusGrapherStrings.discontinuitiesStringProperty, {
      font: CalculusGrapherConstants.PREFERENCES_LABEL_FONT,
      tandem: tandem.createTandem( 'labelText' )
    } );

    const radioButtonGroup = new DiscontinuitiesRadioButtonGroup( connectDiscontinuitiesProperty,
      tandem.createTandem( 'radioButtonGroup' ) );

    super( {
      children: [ labelText, radioButtonGroup ],
      spacing: 15,
      tandem: tandem
    } );

    this.disposeDiscontinuitiesControl = () => {
      labelText.dispose();
      radioButtonGroup.dispose();
    };
  }

  public override dispose(): void {
    this.disposeDiscontinuitiesControl();
    super.dispose();
  }
}

/**
 * The radio button group for this control.
 */
class DiscontinuitiesRadioButtonGroup extends RectangularRadioButtonGroup<ConnectDiscontinuities> {

  public constructor( connectDiscontinuitiesProperty: Property<ConnectDiscontinuities>, tandem: Tandem ) {

    const items: RectangularRadioButtonGroupItem<ConnectDiscontinuities>[] = ConnectDiscontinuitiesValues.map( value => {
      return {
        value: value,
        createNode: () => createIcon( value ),
        tandemName: `${value}${RectangularRadioButton.TANDEM_NAME_SUFFIX}`
      };
    } );

    super( connectDiscontinuitiesProperty, items, {
      orientation: 'horizontal',
      radioButtonOptions: {
        baseColor: 'white',
        xMargin: 0,
        yMargin: 7,
        buttonAppearanceStrategyOptions: {
          selectedLineWidth: 2
        },
        phetioVisiblePropertyInstrumented: false
      },
      phetioVisiblePropertyInstrumented: false,
      tandem: tandem
    } );
  }
}

/**
 * Creates the icon for a radio button.
 */
function createIcon( value: ConnectDiscontinuities ): Node {

  const lineWidth = 2;
  const verticalGap = 25;

  // 2 horizontal lines
  const lineLength = 20;
  const lineOptions = {
    lineWidth: lineWidth,
    stroke: CalculusGrapherColors.derivativeCurveStrokeProperty
  };
  const leftLine = new Line( 0, 0, lineLength, 0, lineOptions );
  const rightLine = new Line( 0, 0, lineLength, 0, lineOptions );

  // 2 open circles
  const circleOptions = {
    radius: 3,
    lineWidth: 2,
    stroke: CalculusGrapherColors.derivativeCurveStrokeProperty
  };
  const leftCircle = new Circle( circleOptions );
  const rightCircle = new Circle( circleOptions );

  // layout, left to right
  leftCircle.left = leftLine.right;
  leftCircle.centerY = leftLine.centerY;
  rightCircle.x = leftCircle.x;
  rightCircle.centerY = leftCircle.centerY - verticalGap;
  rightLine.left = rightCircle.right;
  rightLine.centerY = rightCircle.centerY;

  const children = [ leftLine, rightLine, leftCircle, rightCircle ];

  // optional vertical dashed line, connecting the 2 circles
  if ( value === 'dashedLine' ) {
    children.push( new Line( leftCircle.centerX, leftCircle.top, rightCircle.centerX, rightCircle.bottom,
      combineOptions<LineOptions>( {
        lineDash: [ 2, 2 ]
      }, lineOptions ) )
    );
  }

  return new Node( {
    children: children
  } );
}

calculusGrapher.register( 'DiscontinuitiesControl', DiscontinuitiesControl );
