// Copyright 2025, University of Colorado Boulder

/**
 * CurveManipulatorNode is a draggable point used to manipulate the curve.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Property from '../../../../axon/js/Property.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import Shape from '../../../../kite/js/Shape.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import AccessibleDraggableOptions from '../../../../scenery-phet/js/accessibility/grab-drag/AccessibleDraggableOptions.js';
import ShadedSphereNode, { ShadedSphereNodeOptions } from '../../../../scenery-phet/js/ShadedSphereNode.js';
import HighlightPath from '../../../../scenery/js/accessibility/HighlightPath.js';
import InteractiveHighlighting from '../../../../scenery/js/accessibility/voicing/InteractiveHighlighting.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherFluent from '../../CalculusGrapherFluent.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import TransformedCurve from '../model/TransformedCurve.js';
import CurveManipulatorKeyboardListener from './CurveManipulatorKeyboardListener.js';

// The default position is at the center of the graph.
const DEFAULT_POSITION = new Vector2(
  CalculusGrapherConstants.CURVE_X_RANGE.getCenter(),
  CalculusGrapherConstants.CURVE_MANIPULATION_Y_RANGE.getCenter()
);

export default class CurveManipulatorNode extends InteractiveHighlighting( ShadedSphereNode ) {

  // Position of the cursor, in model coordinates.
  public readonly positionProperty: Property<Vector2>;

  // Whether the manipulator is changing the curve while it is being dragged.
  public readonly isChangingCurveProperty: Property<boolean>;

  // Whether the associated KeyboardCueNode is visible when the manipulator gets focus.
  public readonly isKeyboardCueEnabledProperty: Property<boolean>;

  public constructor(
    originalCurve: TransformedCurve,
    predictCurve: TransformedCurve,
    predictSelectedProperty: TReadOnlyProperty<boolean>,
    chartTransform: ChartTransform,
    tandem: Tandem ) {

    // Color matches the curve that is being manipulated.
    const mainColorProperty = new DerivedProperty( [
        predictSelectedProperty,
        CalculusGrapherColors.predictCurveStrokeProperty,
        CalculusGrapherColors.originalCurveStrokeProperty
      ],
      ( predictSelected, predictCurveStroke, originalCurveStroke ) =>
        predictSelected ? predictCurveStroke : originalCurveStroke );

    const options = combineOptions<ShadedSphereNodeOptions>( {}, AccessibleDraggableOptions, {
      isDisposable: false,
      mainColor: mainColorProperty,
      cursor: 'pointer',
      accessibleName: CalculusGrapherFluent.a11y.curveManipulatorNode.accessibleNameStringProperty,
      accessibleHelpText: CalculusGrapherFluent.a11y.curveManipulatorNode.accessibleHelpTextStringProperty,
      tandem: tandem
    } );

    super( 2 * CalculusGrapherConstants.SCRUBBER_RADIUS, options );

    const focusHighlightPath = new HighlightPath( Shape.bounds( this.bounds.dilated( 5 ) ) );
    this.setFocusHighlight( focusHighlightPath );

    //TODO https://github.com/phetsims/calculus-grapher/issues/125 Do we need a separate interactive highlight?
    const interactiveHighlightPath = new HighlightPath( Shape.bounds( this.bounds.dilated( 5 ) ) );
    this.setInteractiveHighlight( interactiveHighlightPath );

    this.positionProperty = new Vector2Property( DEFAULT_POSITION, {
      tandem: tandem.createTandem( 'positionProperty' ),
      phetioFeatured: true
    } );

    //TODO https://github.com/phetsims/calculus-grapher/issues/125 Which mode should be the default?
    this.isChangingCurveProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'isChangingCurveProperty' ),
      phetioReadOnly: true
    } );

    this.isKeyboardCueEnabledProperty = new BooleanProperty( true, {
      tandem: tandem.createTandem( 'isKeyboardCueEnabledProperty' ),
      phetioReadOnly: true
    } );

    this.positionProperty.link( position => {
      this.center = chartTransform.modelToViewPosition( position );
    } );

    // When switching between curves, update the y-coordinate of the cursor so that it is on a curve.
    predictSelectedProperty.lazyLink( predictSelected => {
      const x = this.positionProperty.value.x;
      const selectedCurve = predictSelected ? predictCurve : originalCurve;
      this.positionProperty.value = selectedCurve.getClosestPointAt( x ).getVector();
    } );

    // Whenever the manipulator gets focus, start it in the mode that does not change the curve.
    this.focusedProperty.link( focused => {
      if ( focused ) {
        this.isChangingCurveProperty.value = false;
      }
    } );

    // Change the focus highlight lineDash to indicate whether the manipulator is changing the curve.
    //TODO https://github.com/phetsims/calculus-grapher/issues/125 Do we also need to modify the interactive highlight? The mode is not relevant for pointer.
    this.isChangingCurveProperty.link( isChangingCurve => focusHighlightPath.setDashed( !isChangingCurve ) );

    // Toggle between positioning the manipulator and modifying the curve.
    this.addInputListener( new CurveManipulatorKeyboardListener( this.isChangingCurveProperty, tandem.createTandem( 'keyboardListener' ) ) );
  }

  public reset(): void {
    this.positionProperty.reset();
    this.isChangingCurveProperty.reset();
    this.isKeyboardCueEnabledProperty.reset();
  }
}

calculusGrapher.register( 'CurveManipulatorNode', CurveManipulatorNode );