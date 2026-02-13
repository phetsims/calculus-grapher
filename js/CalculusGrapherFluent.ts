// Copyright 2025-2026, University of Colorado Boulder
// AUTOMATICALLY GENERATED – DO NOT EDIT.
// Generated from calculus-grapher-strings_en.yaml

/* eslint-disable */
/* @formatter:off */

import FluentLibrary from '../../chipper/js/browser-and-node/FluentLibrary.js';
import FluentComment from '../../chipper/js/browser/FluentComment.js';
import FluentConstant from '../../chipper/js/browser/FluentConstant.js';
import FluentContainer from '../../chipper/js/browser/FluentContainer.js';
import type {FluentVariable} from '../../chipper/js/browser/FluentPattern.js';
import FluentPattern from '../../chipper/js/browser/FluentPattern.js';
import calculusGrapher from './calculusGrapher.js';
import CalculusGrapherStrings from './CalculusGrapherStrings.js';

// This map is used to create the fluent file and link to all StringProperties.
// Accessing StringProperties is also critical for including them in the built sim.
// However, if strings are unused in Fluent system too, they will be fully excluded from
// the build. So we need to only add actually used strings.
const fluentKeyToStringPropertyMap = new Map();

const addToMapIfDefined = ( key: string, path: string ) => {
  const sp = _.get( CalculusGrapherStrings, path );
  if ( sp ) {
    fluentKeyToStringPropertyMap.set( key, sp );
  }
};

addToMapIfDefined( 'calculus_grapher_title', 'calculus-grapher.titleStringProperty' );
addToMapIfDefined( 'screen_derivative', 'screen.derivativeStringProperty' );
addToMapIfDefined( 'screen_integral', 'screen.integralStringProperty' );
addToMapIfDefined( 'screen_advanced', 'screen.advancedStringProperty' );
addToMapIfDefined( 'screen_lab', 'screen.labStringProperty' );
addToMapIfDefined( 'smooth', 'smoothStringProperty' );
addToMapIfDefined( 'symbol_d', 'symbol.dStringProperty' );
addToMapIfDefined( 'symbol_f', 'symbol.fStringProperty' );
addToMapIfDefined( 'symbol_x', 'symbol.xStringProperty' );
addToMapIfDefined( 'symbol_t', 'symbol.tStringProperty' );
addToMapIfDefined( 'discontinuities', 'discontinuitiesStringProperty' );
addToMapIfDefined( 'values', 'valuesStringProperty' );
addToMapIfDefined( 'notation', 'notationStringProperty' );
addToMapIfDefined( 'lagrange', 'lagrangeStringProperty' );
addToMapIfDefined( 'leibniz', 'leibnizStringProperty' );
addToMapIfDefined( 'variable', 'variableStringProperty' );
addToMapIfDefined( 'checkbox_areaUnderCurve', 'checkbox.areaUnderCurveStringProperty' );
addToMapIfDefined( 'checkbox_tangent', 'checkbox.tangentStringProperty' );
addToMapIfDefined( 'barometer_netSignedArea', 'barometer.netSignedAreaStringProperty' );
addToMapIfDefined( 'barometer_slopeOfTangent', 'barometer.slopeOfTangentStringProperty' );
addToMapIfDefined( 'predict', 'predictStringProperty' );
addToMapIfDefined( 'show', 'showStringProperty' );
addToMapIfDefined( 'predictPreference', 'predictPreferenceStringProperty' );
addToMapIfDefined( 'valuesPreferenceDescription', 'valuesPreferenceDescriptionStringProperty' );
addToMapIfDefined( 'referenceLine', 'referenceLineStringProperty' );
addToMapIfDefined( 'curveManipulator_keyboardHelpHeading', 'curveManipulator.keyboardHelpHeadingStringProperty' );
addToMapIfDefined( 'curveManipulator_keyboardHelpLabel', 'curveManipulator.keyboardHelpLabelStringProperty' );
addToMapIfDefined( 'curveManipulator_keyboardCue', 'curveManipulator.keyboardCueStringProperty' );
addToMapIfDefined( 'explorationTools', 'explorationToolsStringProperty' );
addToMapIfDefined( 'a11y_screen_defaults_screenSummary_currentDetails_leadingParagraph_widthPattern', 'a11y.screen.defaults.screenSummary.currentDetails.leadingParagraph.widthPatternStringProperty' );
addToMapIfDefined( 'a11y_screen_defaults_screenSummary_currentDetails_leadingParagraph_noWidthPattern', 'a11y.screen.defaults.screenSummary.currentDetails.leadingParagraph.noWidthPatternStringProperty' );
addToMapIfDefined( 'a11y_screen_defaults_screenSummary_currentDetails_leadingParagraph_curveSentence_curvesShown', 'a11y.screen.defaults.screenSummary.currentDetails.leadingParagraph.curveSentence.curvesShownStringProperty' );
addToMapIfDefined( 'a11y_screen_defaults_screenSummary_currentDetails_leadingParagraph_curveSentence_allCurvesHidden', 'a11y.screen.defaults.screenSummary.currentDetails.leadingParagraph.curveSentence.allCurvesHiddenStringProperty' );
addToMapIfDefined( 'a11y_screen_defaults_screenSummary_currentDetails_accessibleList_primary', 'a11y.screen.defaults.screenSummary.currentDetails.accessibleList.primaryStringProperty' );
addToMapIfDefined( 'a11y_screen_defaults_screenSummary_currentDetails_accessibleList_predict', 'a11y.screen.defaults.screenSummary.currentDetails.accessibleList.predictStringProperty' );
addToMapIfDefined( 'a11y_screen_defaults_screenSummary_currentDetails_accessibleList_integral', 'a11y.screen.defaults.screenSummary.currentDetails.accessibleList.integralStringProperty' );
addToMapIfDefined( 'a11y_screen_defaults_screenSummary_currentDetails_accessibleList_derivative', 'a11y.screen.defaults.screenSummary.currentDetails.accessibleList.derivativeStringProperty' );
addToMapIfDefined( 'a11y_screen_defaults_screenSummary_currentDetails_accessibleList_secondDerivative', 'a11y.screen.defaults.screenSummary.currentDetails.accessibleList.secondDerivativeStringProperty' );
addToMapIfDefined( 'a11y_screen_defaults_screenSummary_controlArea', 'a11y.screen.defaults.screenSummary.controlAreaStringProperty' );
addToMapIfDefined( 'a11y_screen_derivative_screenButtonsHelpText', 'a11y.screen.derivative.screenButtonsHelpTextStringProperty' );
addToMapIfDefined( 'a11y_screen_derivative_screenSummary_playArea', 'a11y.screen.derivative.screenSummary.playAreaStringProperty' );
addToMapIfDefined( 'a11y_screen_derivative_screenSummary_interactionHint', 'a11y.screen.derivative.screenSummary.interactionHintStringProperty' );
addToMapIfDefined( 'a11y_screen_integral_screenButtonsHelpText', 'a11y.screen.integral.screenButtonsHelpTextStringProperty' );
addToMapIfDefined( 'a11y_screen_integral_screenSummary_playArea', 'a11y.screen.integral.screenSummary.playAreaStringProperty' );
addToMapIfDefined( 'a11y_screen_integral_screenSummary_interactionHint', 'a11y.screen.integral.screenSummary.interactionHintStringProperty' );
addToMapIfDefined( 'a11y_screen_advanced_screenButtonsHelpText', 'a11y.screen.advanced.screenButtonsHelpTextStringProperty' );
addToMapIfDefined( 'a11y_screen_advanced_screenSummary_playArea', 'a11y.screen.advanced.screenSummary.playAreaStringProperty' );
addToMapIfDefined( 'a11y_screen_advanced_screenSummary_interactionHint', 'a11y.screen.advanced.screenSummary.interactionHintStringProperty' );
addToMapIfDefined( 'a11y_screen_lab_screenButtonsHelpText', 'a11y.screen.lab.screenButtonsHelpTextStringProperty' );
addToMapIfDefined( 'a11y_screen_lab_screenSummary_playArea', 'a11y.screen.lab.screenSummary.playAreaStringProperty' );
addToMapIfDefined( 'a11y_screen_lab_screenSummary_interactionHint', 'a11y.screen.lab.screenSummary.interactionHintStringProperty' );
addToMapIfDefined( 'a11y_headings_curveManipulationSettingsAndControls', 'a11y.headings.curveManipulationSettingsAndControlsStringProperty' );
addToMapIfDefined( 'a11y_headings_explorationToolControls', 'a11y.headings.explorationToolControlsStringProperty' );
addToMapIfDefined( 'a11y_headings_explorationTools', 'a11y.headings.explorationToolsStringProperty' );
addToMapIfDefined( 'a11y_slopeOfTangentAccordionBox_accessibleHelpTextCollapsed', 'a11y.slopeOfTangentAccordionBox.accessibleHelpTextCollapsedStringProperty' );
addToMapIfDefined( 'a11y_slopeOfTangentAccordionBox_accessibleParagraph', 'a11y.slopeOfTangentAccordionBox.accessibleParagraphStringProperty' );
addToMapIfDefined( 'a11y_netSignedAreaAccordionBox_accessibleHelpTextCollapsed', 'a11y.netSignedAreaAccordionBox.accessibleHelpTextCollapsedStringProperty' );
addToMapIfDefined( 'a11y_netSignedAreaAccordionBox_accessibleParagraph', 'a11y.netSignedAreaAccordionBox.accessibleParagraphStringProperty' );
addToMapIfDefined( 'a11y_curveActionsButtonGroup_accessibleHeading', 'a11y.curveActionsButtonGroup.accessibleHeadingStringProperty' );
addToMapIfDefined( 'a11y_curveActionsButtonGroup_accessibleHelpText', 'a11y.curveActionsButtonGroup.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_smoothButton_accessibleName', 'a11y.smoothButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_smoothButton_accessibleHelpText', 'a11y.smoothButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_smoothButton_accessibleContextResponse_allCurves', 'a11y.smoothButton.accessibleContextResponse.allCurvesStringProperty' );
addToMapIfDefined( 'a11y_smoothButton_accessibleContextResponse_predictCurve', 'a11y.smoothButton.accessibleContextResponse.predictCurveStringProperty' );
addToMapIfDefined( 'a11y_eraserButton_accessibleName', 'a11y.eraserButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_eraserButton_accessibleHelpText', 'a11y.eraserButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_eraserButton_accessibleContextResponse_primaryCurve', 'a11y.eraserButton.accessibleContextResponse.primaryCurveStringProperty' );
addToMapIfDefined( 'a11y_eraserButton_accessibleContextResponse_predictCurve', 'a11y.eraserButton.accessibleContextResponse.predictCurveStringProperty' );
addToMapIfDefined( 'a11y_undoButton_accessibleName', 'a11y.undoButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_undoButton_accessibleHelpText', 'a11y.undoButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_undoButton_accessibleContextResponse_primaryCurve', 'a11y.undoButton.accessibleContextResponse.primaryCurveStringProperty' );
addToMapIfDefined( 'a11y_undoButton_accessibleContextResponse_predictCurve', 'a11y.undoButton.accessibleContextResponse.predictCurveStringProperty' );
addToMapIfDefined( 'a11y_eyeToggleButton_accessibleNameOn_integral', 'a11y.eyeToggleButton.accessibleNameOn.integralStringProperty' );
addToMapIfDefined( 'a11y_eyeToggleButton_accessibleNameOn_primary', 'a11y.eyeToggleButton.accessibleNameOn.primaryStringProperty' );
addToMapIfDefined( 'a11y_eyeToggleButton_accessibleNameOn_derivative', 'a11y.eyeToggleButton.accessibleNameOn.derivativeStringProperty' );
addToMapIfDefined( 'a11y_eyeToggleButton_accessibleNameOn_secondDerivative', 'a11y.eyeToggleButton.accessibleNameOn.secondDerivativeStringProperty' );
addToMapIfDefined( 'a11y_eyeToggleButton_accessibleNameOff_integral', 'a11y.eyeToggleButton.accessibleNameOff.integralStringProperty' );
addToMapIfDefined( 'a11y_eyeToggleButton_accessibleNameOff_primary', 'a11y.eyeToggleButton.accessibleNameOff.primaryStringProperty' );
addToMapIfDefined( 'a11y_eyeToggleButton_accessibleNameOff_derivative', 'a11y.eyeToggleButton.accessibleNameOff.derivativeStringProperty' );
addToMapIfDefined( 'a11y_eyeToggleButton_accessibleNameOff_secondDerivative', 'a11y.eyeToggleButton.accessibleNameOff.secondDerivativeStringProperty' );
addToMapIfDefined( 'a11y_eyeToggleButton_accessibleHelpText', 'a11y.eyeToggleButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_eyeToggleButton_accessibleContextResponseOff', 'a11y.eyeToggleButton.accessibleContextResponseOffStringProperty' );
addToMapIfDefined( 'a11y_eyeToggleButton_accessibleContextResponseOn', 'a11y.eyeToggleButton.accessibleContextResponseOnStringProperty' );
addToMapIfDefined( 'a11y_yZoomButtonGroup_zoomInButton_accessibleName_integral', 'a11y.yZoomButtonGroup.zoomInButton.accessibleName.integralStringProperty' );
addToMapIfDefined( 'a11y_yZoomButtonGroup_zoomInButton_accessibleName_derivative', 'a11y.yZoomButtonGroup.zoomInButton.accessibleName.derivativeStringProperty' );
addToMapIfDefined( 'a11y_yZoomButtonGroup_zoomInButton_accessibleName_secondDerivative', 'a11y.yZoomButtonGroup.zoomInButton.accessibleName.secondDerivativeStringProperty' );
addToMapIfDefined( 'a11y_yZoomButtonGroup_zoomInButton_accessibleHelpText', 'a11y.yZoomButtonGroup.zoomInButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_yZoomButtonGroup_zoomInButton_accessibleContextResponse', 'a11y.yZoomButtonGroup.zoomInButton.accessibleContextResponseStringProperty' );
addToMapIfDefined( 'a11y_yZoomButtonGroup_zoomOutButton_accessibleName_integral', 'a11y.yZoomButtonGroup.zoomOutButton.accessibleName.integralStringProperty' );
addToMapIfDefined( 'a11y_yZoomButtonGroup_zoomOutButton_accessibleName_derivative', 'a11y.yZoomButtonGroup.zoomOutButton.accessibleName.derivativeStringProperty' );
addToMapIfDefined( 'a11y_yZoomButtonGroup_zoomOutButton_accessibleName_secondDerivative', 'a11y.yZoomButtonGroup.zoomOutButton.accessibleName.secondDerivativeStringProperty' );
addToMapIfDefined( 'a11y_yZoomButtonGroup_zoomOutButton_accessibleHelpText', 'a11y.yZoomButtonGroup.zoomOutButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_yZoomButtonGroup_zoomOutButton_accessibleContextResponse', 'a11y.yZoomButtonGroup.zoomOutButton.accessibleContextResponseStringProperty' );
addToMapIfDefined( 'a11y_tangentCheckbox_accessibleHelpText', 'a11y.tangentCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_tangentCheckbox_accessibleContextResponseChecked', 'a11y.tangentCheckbox.accessibleContextResponseCheckedStringProperty' );
addToMapIfDefined( 'a11y_tangentCheckbox_accessibleContextResponseUnchecked', 'a11y.tangentCheckbox.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_referenceLineCheckbox_accessibleName', 'a11y.referenceLineCheckbox.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_referenceLineCheckbox_accessibleHelpText', 'a11y.referenceLineCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_referenceLineCheckbox_accessibleContextResponseChecked', 'a11y.referenceLineCheckbox.accessibleContextResponseCheckedStringProperty' );
addToMapIfDefined( 'a11y_referenceLineCheckbox_accessibleContextResponseUnchecked', 'a11y.referenceLineCheckbox.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_areaUnderCurveCheckbox_accessibleName', 'a11y.areaUnderCurveCheckbox.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_areaUnderCurveCheckbox_accessibleHelpText', 'a11y.areaUnderCurveCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_areaUnderCurveCheckbox_accessibleContextResponseChecked', 'a11y.areaUnderCurveCheckbox.accessibleContextResponseCheckedStringProperty' );
addToMapIfDefined( 'a11y_areaUnderCurveCheckbox_accessibleContextResponseUnchecked', 'a11y.areaUnderCurveCheckbox.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_gridCheckbox_accessibleName', 'a11y.gridCheckbox.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_gridCheckbox_accessibleHelpText', 'a11y.gridCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_gridCheckbox_accessibleContextResponseChecked', 'a11y.gridCheckbox.accessibleContextResponseCheckedStringProperty' );
addToMapIfDefined( 'a11y_gridCheckbox_accessibleContextResponseUnchecked', 'a11y.gridCheckbox.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_showOriginalCurveCheckbox_accessibleName', 'a11y.showOriginalCurveCheckbox.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_showOriginalCurveCheckbox_accessibleHelpText', 'a11y.showOriginalCurveCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_showOriginalCurveCheckbox_accessibleContextResponseChecked', 'a11y.showOriginalCurveCheckbox.accessibleContextResponseCheckedStringProperty' );
addToMapIfDefined( 'a11y_showOriginalCurveCheckbox_accessibleContextResponseUnchecked', 'a11y.showOriginalCurveCheckbox.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_graphArea_defaults_accessibleList_leadingParagraph', 'a11y.graphArea.defaults.accessibleList.leadingParagraphStringProperty' );
addToMapIfDefined( 'a11y_graphArea_defaults_accessibleList_coordinateGridShown', 'a11y.graphArea.defaults.accessibleList.coordinateGridShownStringProperty' );
addToMapIfDefined( 'a11y_graphArea_defaults_accessibleList_valuesLabeledOnAxes', 'a11y.graphArea.defaults.accessibleList.valuesLabeledOnAxesStringProperty' );
addToMapIfDefined( 'a11y_graphArea_primary_accessibleHeading', 'a11y.graphArea.primary.accessibleHeadingStringProperty' );
addToMapIfDefined( 'a11y_graphArea_primary_accessibleList_primaryCurve_continuousAndDifferentiable', 'a11y.graphArea.primary.accessibleList.primaryCurve.continuousAndDifferentiableStringProperty' );
addToMapIfDefined( 'a11y_graphArea_primary_accessibleList_primaryCurve_continuousAndNotDifferentiable', 'a11y.graphArea.primary.accessibleList.primaryCurve.continuousAndNotDifferentiableStringProperty' );
addToMapIfDefined( 'a11y_graphArea_primary_accessibleList_primaryCurve_discontinuousAndNotDifferentiable', 'a11y.graphArea.primary.accessibleList.primaryCurve.discontinuousAndNotDifferentiableStringProperty' );
addToMapIfDefined( 'a11y_graphArea_primary_accessibleList_primaryCurve_hidden', 'a11y.graphArea.primary.accessibleList.primaryCurve.hiddenStringProperty' );
addToMapIfDefined( 'a11y_graphArea_primary_accessibleList_predictCurve_continuousAndDifferentiable', 'a11y.graphArea.primary.accessibleList.predictCurve.continuousAndDifferentiableStringProperty' );
addToMapIfDefined( 'a11y_graphArea_primary_accessibleList_predictCurve_continuousAndNotDifferentiable', 'a11y.graphArea.primary.accessibleList.predictCurve.continuousAndNotDifferentiableStringProperty' );
addToMapIfDefined( 'a11y_graphArea_primary_accessibleList_predictCurve_discontinuousAndNotDifferentiable', 'a11y.graphArea.primary.accessibleList.predictCurve.discontinuousAndNotDifferentiableStringProperty' );
addToMapIfDefined( 'a11y_graphArea_primary_accessibleList_predictCurve_hidden', 'a11y.graphArea.primary.accessibleList.predictCurve.hiddenStringProperty' );
addToMapIfDefined( 'a11y_graphArea_integral_accessibleHeading', 'a11y.graphArea.integral.accessibleHeadingStringProperty' );
addToMapIfDefined( 'a11y_graphArea_integral_accessibleList_continuous', 'a11y.graphArea.integral.accessibleList.continuousStringProperty' );
addToMapIfDefined( 'a11y_graphArea_integral_accessibleList_hidden', 'a11y.graphArea.integral.accessibleList.hiddenStringProperty' );
addToMapIfDefined( 'a11y_graphArea_derivative_accessibleHeading', 'a11y.graphArea.derivative.accessibleHeadingStringProperty' );
addToMapIfDefined( 'a11y_graphArea_derivative_accessibleList_continuousAndDifferentiable', 'a11y.graphArea.derivative.accessibleList.continuousAndDifferentiableStringProperty' );
addToMapIfDefined( 'a11y_graphArea_derivative_accessibleList_discontinuousAndNotDifferentiable', 'a11y.graphArea.derivative.accessibleList.discontinuousAndNotDifferentiableStringProperty' );
addToMapIfDefined( 'a11y_graphArea_derivative_accessibleList_hidden', 'a11y.graphArea.derivative.accessibleList.hiddenStringProperty' );
addToMapIfDefined( 'a11y_graphArea_secondDerivative_accessibleHeading', 'a11y.graphArea.secondDerivative.accessibleHeadingStringProperty' );
addToMapIfDefined( 'a11y_graphArea_secondDerivative_accessibleList_continuousAndDifferentiable', 'a11y.graphArea.secondDerivative.accessibleList.continuousAndDifferentiableStringProperty' );
addToMapIfDefined( 'a11y_graphArea_secondDerivative_accessibleList_discontinuousAndNotDifferentiable', 'a11y.graphArea.secondDerivative.accessibleList.discontinuousAndNotDifferentiableStringProperty' );
addToMapIfDefined( 'a11y_graphArea_secondDerivative_accessibleList_hidden', 'a11y.graphArea.secondDerivative.accessibleList.hiddenStringProperty' );
addToMapIfDefined( 'a11y_predictRadioButtonGroup_accessibleName', 'a11y.predictRadioButtonGroup.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_predictRadioButtonGroup_accessibleHelpText', 'a11y.predictRadioButtonGroup.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_predictRadioButtonGroup_originalCurveRadioButton_accessibleName', 'a11y.predictRadioButtonGroup.originalCurveRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_predictRadioButtonGroup_originalCurveRadioButton_accessibleHelpText', 'a11y.predictRadioButtonGroup.originalCurveRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_predictRadioButtonGroup_predictCurveRadioButton_accessibleName', 'a11y.predictRadioButtonGroup.predictCurveRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_predictRadioButtonGroup_predictCurveRadioButton_accessibleHelpText', 'a11y.predictRadioButtonGroup.predictCurveRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_shapesRadioButtonGroup_accessibleName', 'a11y.shapesRadioButtonGroup.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_shapesRadioButtonGroup_accessibleHelpText', 'a11y.shapesRadioButtonGroup.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_shapesRadioButtonGroup_hillRadioButton_accessibleName', 'a11y.shapesRadioButtonGroup.hillRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_shapesRadioButtonGroup_hillRadioButton_accessibleHelpText', 'a11y.shapesRadioButtonGroup.hillRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_shapesRadioButtonGroup_triangleRadioButton_accessibleName', 'a11y.shapesRadioButtonGroup.triangleRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_shapesRadioButtonGroup_triangleRadioButton_accessibleHelpText', 'a11y.shapesRadioButtonGroup.triangleRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_shapesRadioButtonGroup_pedestalRadioButton_accessibleName', 'a11y.shapesRadioButtonGroup.pedestalRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_shapesRadioButtonGroup_pedestalRadioButton_accessibleHelpText', 'a11y.shapesRadioButtonGroup.pedestalRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_shapesRadioButtonGroup_parabolaRadioButton_accessibleName', 'a11y.shapesRadioButtonGroup.parabolaRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_shapesRadioButtonGroup_parabolaRadioButton_accessibleHelpText', 'a11y.shapesRadioButtonGroup.parabolaRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_shapesRadioButtonGroup_sinusoidRadioButton_accessibleName', 'a11y.shapesRadioButtonGroup.sinusoidRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_shapesRadioButtonGroup_sinusoidRadioButton_accessibleHelpText', 'a11y.shapesRadioButtonGroup.sinusoidRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_shapesRadioButtonGroup_freeformRadioButton_accessibleName', 'a11y.shapesRadioButtonGroup.freeformRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_shapesRadioButtonGroup_freeformRadioButton_accessibleHelpText', 'a11y.shapesRadioButtonGroup.freeformRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_shapesRadioButtonGroup_tiltRadioButton_accessibleName', 'a11y.shapesRadioButtonGroup.tiltRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_shapesRadioButtonGroup_tiltRadioButton_accessibleHelpText', 'a11y.shapesRadioButtonGroup.tiltRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_shapesRadioButtonGroup_shiftRadioButton_accessibleName', 'a11y.shapesRadioButtonGroup.shiftRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_shapesRadioButtonGroup_shiftRadioButton_accessibleHelpText', 'a11y.shapesRadioButtonGroup.shiftRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_graphSetRadioButtonGroup_accessibleName', 'a11y.graphSetRadioButtonGroup.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_graphSetRadioButtonGroup_accessibleHelpText', 'a11y.graphSetRadioButtonGroup.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_graphSetRadioButtonGroup_integralPrimaryRadioButton_accessibleName', 'a11y.graphSetRadioButtonGroup.integralPrimaryRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_graphSetRadioButtonGroup_integralPrimaryRadioButton_accessibleHelpText', 'a11y.graphSetRadioButtonGroup.integralPrimaryRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_graphSetRadioButtonGroup_primaryDerivativeRadioButton_accessibleName', 'a11y.graphSetRadioButtonGroup.primaryDerivativeRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_graphSetRadioButtonGroup_primaryDerivativeRadioButton_accessibleHelpText', 'a11y.graphSetRadioButtonGroup.primaryDerivativeRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_graphSetRadioButtonGroup_integralPrimaryDerivativeRadioButton_accessibleName', 'a11y.graphSetRadioButtonGroup.integralPrimaryDerivativeRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_graphSetRadioButtonGroup_integralPrimaryDerivativeRadioButton_accessibleHelpText', 'a11y.graphSetRadioButtonGroup.integralPrimaryDerivativeRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_graphSetRadioButtonGroup_primaryDerivativeSecondDerivativeRadioButton_accessibleName', 'a11y.graphSetRadioButtonGroup.primaryDerivativeSecondDerivativeRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_graphSetRadioButtonGroup_primaryDerivativeSecondDerivativeRadioButton_accessibleHelpText', 'a11y.graphSetRadioButtonGroup.primaryDerivativeSecondDerivativeRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_variableRadioButtonGroup_accessibleHelpText', 'a11y.variableRadioButtonGroup.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_variableRadioButtonGroup_xRadioButton_accessibleHelpText', 'a11y.variableRadioButtonGroup.xRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_variableRadioButtonGroup_tRadioButton_accessibleHelpText', 'a11y.variableRadioButtonGroup.tRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_notationRadioButtonGroup_accessibleHelpText', 'a11y.notationRadioButtonGroup.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_notationRadioButtonGroup_lagrangeRadioButton_accessibleName', 'a11y.notationRadioButtonGroup.lagrangeRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_notationRadioButtonGroup_lagrangeRadioButton_accessibleHelpText', 'a11y.notationRadioButtonGroup.lagrangeRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_notationRadioButtonGroup_leibnizRadioButton_accessibleName', 'a11y.notationRadioButtonGroup.leibnizRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_notationRadioButtonGroup_leibnizRadioButton_accessibleHelpText', 'a11y.notationRadioButtonGroup.leibnizRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_discontinuitiesRadioButtonGroup_accessibleHelpText', 'a11y.discontinuitiesRadioButtonGroup.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_discontinuitiesRadioButtonGroup_noLineRadioButton_accessibleName', 'a11y.discontinuitiesRadioButtonGroup.noLineRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_discontinuitiesRadioButtonGroup_noLineRadioButton_accessibleHelpText', 'a11y.discontinuitiesRadioButtonGroup.noLineRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_discontinuitiesRadioButtonGroup_dashedLineRadioButton_accessibleName', 'a11y.discontinuitiesRadioButtonGroup.dashedLineRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_discontinuitiesRadioButtonGroup_dashedLineRadioButton_accessibleHelpText', 'a11y.discontinuitiesRadioButtonGroup.dashedLineRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_shapeWidthSlider_accessibleName', 'a11y.shapeWidthSlider.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_shapeWidthSlider_accessibleHelpText', 'a11y.shapeWidthSlider.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_predictToggleSwitch_accessibleHelpText', 'a11y.predictToggleSwitch.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_curveManipulator_defaults_accessibleObjectResponse_focusedReleased', 'a11y.curveManipulator.defaults.accessibleObjectResponse.focusedReleasedStringProperty' );
addToMapIfDefined( 'a11y_curveManipulator_defaults_accessibleObjectResponse_focusedGrabbed', 'a11y.curveManipulator.defaults.accessibleObjectResponse.focusedGrabbedStringProperty' );
addToMapIfDefined( 'a11y_curveManipulator_defaults_accessibleObjectResponse_grabbed', 'a11y.curveManipulator.defaults.accessibleObjectResponse.grabbedStringProperty' );
addToMapIfDefined( 'a11y_curveManipulator_defaults_accessibleObjectResponse_released', 'a11y.curveManipulator.defaults.accessibleObjectResponse.releasedStringProperty' );
addToMapIfDefined( 'a11y_curveManipulator_defaults_accessibleObjectResponse_movedReleased', 'a11y.curveManipulator.defaults.accessibleObjectResponse.movedReleasedStringProperty' );
addToMapIfDefined( 'a11y_curveManipulator_defaults_accessibleObjectResponse_movedGrabbed', 'a11y.curveManipulator.defaults.accessibleObjectResponse.movedGrabbedStringProperty' );
addToMapIfDefined( 'a11y_curveManipulator_primary_accessibleName', 'a11y.curveManipulator.primary.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_curveManipulator_primary_accessibleHelpText', 'a11y.curveManipulator.primary.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_curveManipulator_predict_accessibleName', 'a11y.curveManipulator.predict.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_curveManipulator_predict_accessibleHelpText', 'a11y.curveManipulator.predict.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_referenceLine_accessibleName', 'a11y.referenceLine.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_referenceLine_accessibleHelpText', 'a11y.referenceLine.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_referenceLine_accessibleObjectResponse_patterns_primaryDerivative', 'a11y.referenceLine.accessibleObjectResponse.patterns.primaryDerivativeStringProperty' );
addToMapIfDefined( 'a11y_referenceLine_accessibleObjectResponse_patterns_integralPrimary', 'a11y.referenceLine.accessibleObjectResponse.patterns.integralPrimaryStringProperty' );
addToMapIfDefined( 'a11y_referenceLine_accessibleObjectResponse_patterns_integralPrimaryDerivative', 'a11y.referenceLine.accessibleObjectResponse.patterns.integralPrimaryDerivativeStringProperty' );
addToMapIfDefined( 'a11y_referenceLine_accessibleObjectResponse_patterns_primaryDerivativeSecondDerivative', 'a11y.referenceLine.accessibleObjectResponse.patterns.primaryDerivativeSecondDerivativeStringProperty' );
addToMapIfDefined( 'a11y_referenceLine_accessibleObjectResponse_xPhrase', 'a11y.referenceLine.accessibleObjectResponse.xPhraseStringProperty' );
addToMapIfDefined( 'a11y_referenceLine_accessibleObjectResponse_primaryPhrase_predictAndPrimary', 'a11y.referenceLine.accessibleObjectResponse.primaryPhrase.predictAndPrimaryStringProperty' );
addToMapIfDefined( 'a11y_referenceLine_accessibleObjectResponse_primaryPhrase_predictUndefined', 'a11y.referenceLine.accessibleObjectResponse.primaryPhrase.predictUndefinedStringProperty' );
addToMapIfDefined( 'a11y_referenceLine_accessibleObjectResponse_primaryPhrase_predictValue', 'a11y.referenceLine.accessibleObjectResponse.primaryPhrase.predictValueStringProperty' );
addToMapIfDefined( 'a11y_referenceLine_accessibleObjectResponse_primaryPhrase_predictHidden', 'a11y.referenceLine.accessibleObjectResponse.primaryPhrase.predictHiddenStringProperty' );
addToMapIfDefined( 'a11y_referenceLine_accessibleObjectResponse_primaryPhrase_primaryUndefined', 'a11y.referenceLine.accessibleObjectResponse.primaryPhrase.primaryUndefinedStringProperty' );
addToMapIfDefined( 'a11y_referenceLine_accessibleObjectResponse_primaryPhrase_primaryValue', 'a11y.referenceLine.accessibleObjectResponse.primaryPhrase.primaryValueStringProperty' );
addToMapIfDefined( 'a11y_referenceLine_accessibleObjectResponse_primaryPhrase_primaryHidden', 'a11y.referenceLine.accessibleObjectResponse.primaryPhrase.primaryHiddenStringProperty' );
addToMapIfDefined( 'a11y_referenceLine_accessibleObjectResponse_integralPhrase_integralValue', 'a11y.referenceLine.accessibleObjectResponse.integralPhrase.integralValueStringProperty' );
addToMapIfDefined( 'a11y_referenceLine_accessibleObjectResponse_integralPhrase_integralHidden', 'a11y.referenceLine.accessibleObjectResponse.integralPhrase.integralHiddenStringProperty' );
addToMapIfDefined( 'a11y_referenceLine_accessibleObjectResponse_derivativePhrase_derivativeUndefined', 'a11y.referenceLine.accessibleObjectResponse.derivativePhrase.derivativeUndefinedStringProperty' );
addToMapIfDefined( 'a11y_referenceLine_accessibleObjectResponse_derivativePhrase_derivativeValue', 'a11y.referenceLine.accessibleObjectResponse.derivativePhrase.derivativeValueStringProperty' );
addToMapIfDefined( 'a11y_referenceLine_accessibleObjectResponse_derivativePhrase_derivativeHidden', 'a11y.referenceLine.accessibleObjectResponse.derivativePhrase.derivativeHiddenStringProperty' );
addToMapIfDefined( 'a11y_referenceLine_accessibleObjectResponse_secondDerivativePhrase_secondDerivativeUndefined', 'a11y.referenceLine.accessibleObjectResponse.secondDerivativePhrase.secondDerivativeUndefinedStringProperty' );
addToMapIfDefined( 'a11y_referenceLine_accessibleObjectResponse_secondDerivativePhrase_secondDerivativeValue', 'a11y.referenceLine.accessibleObjectResponse.secondDerivativePhrase.secondDerivativeValueStringProperty' );
addToMapIfDefined( 'a11y_referenceLine_accessibleObjectResponse_secondDerivativePhrase_secondDerivativeHidden', 'a11y.referenceLine.accessibleObjectResponse.secondDerivativePhrase.secondDerivativeHiddenStringProperty' );
addToMapIfDefined( 'a11y_tangentTool_accessibleName', 'a11y.tangentTool.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_tangentTool_accessibleHelpText', 'a11y.tangentTool.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_tangentTool_accessibleObjectResponse_pattern', 'a11y.tangentTool.accessibleObjectResponse.patternStringProperty' );
addToMapIfDefined( 'a11y_tangentTool_accessibleObjectResponse_xPhrase', 'a11y.tangentTool.accessibleObjectResponse.xPhraseStringProperty' );
addToMapIfDefined( 'a11y_tangentTool_accessibleObjectResponse_slopePhrase_slopeHidden', 'a11y.tangentTool.accessibleObjectResponse.slopePhrase.slopeHiddenStringProperty' );
addToMapIfDefined( 'a11y_tangentTool_accessibleObjectResponse_slopePhrase_slopeZeroValue', 'a11y.tangentTool.accessibleObjectResponse.slopePhrase.slopeZeroValueStringProperty' );
addToMapIfDefined( 'a11y_tangentTool_accessibleObjectResponse_slopePhrase_slopePositiveValue', 'a11y.tangentTool.accessibleObjectResponse.slopePhrase.slopePositiveValueStringProperty' );
addToMapIfDefined( 'a11y_tangentTool_accessibleObjectResponse_slopePhrase_slopeNegativeValue', 'a11y.tangentTool.accessibleObjectResponse.slopePhrase.slopeNegativeValueStringProperty' );
addToMapIfDefined( 'a11y_tangentTool_accessibleObjectResponse_derivativePhrase_derivativeValue', 'a11y.tangentTool.accessibleObjectResponse.derivativePhrase.derivativeValueStringProperty' );
addToMapIfDefined( 'a11y_tangentTool_accessibleObjectResponse_derivativePhrase_derivativeHidden', 'a11y.tangentTool.accessibleObjectResponse.derivativePhrase.derivativeHiddenStringProperty' );
addToMapIfDefined( 'a11y_areaUnderCurveTool_accessibleName', 'a11y.areaUnderCurveTool.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_areaUnderCurveTool_accessibleHelpText', 'a11y.areaUnderCurveTool.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_areaUnderCurveTool_accessibleObjectResponse_pattern', 'a11y.areaUnderCurveTool.accessibleObjectResponse.patternStringProperty' );
addToMapIfDefined( 'a11y_areaUnderCurveTool_accessibleObjectResponse_xPhrase', 'a11y.areaUnderCurveTool.accessibleObjectResponse.xPhraseStringProperty' );
addToMapIfDefined( 'a11y_areaUnderCurveTool_accessibleObjectResponse_integralPhrase_integralValue', 'a11y.areaUnderCurveTool.accessibleObjectResponse.integralPhrase.integralValueStringProperty' );
addToMapIfDefined( 'a11y_areaUnderCurveTool_accessibleObjectResponse_integralPhrase_integralHidden', 'a11y.areaUnderCurveTool.accessibleObjectResponse.integralPhrase.integralHiddenStringProperty' );
addToMapIfDefined( 'a11y_areaUnderCurveTool_accessibleObjectResponse_areaPhrase_areaZeroValue', 'a11y.areaUnderCurveTool.accessibleObjectResponse.areaPhrase.areaZeroValueStringProperty' );
addToMapIfDefined( 'a11y_areaUnderCurveTool_accessibleObjectResponse_areaPhrase_areaPositiveValue', 'a11y.areaUnderCurveTool.accessibleObjectResponse.areaPhrase.areaPositiveValueStringProperty' );
addToMapIfDefined( 'a11y_areaUnderCurveTool_accessibleObjectResponse_areaPhrase_areaNegativeValue', 'a11y.areaUnderCurveTool.accessibleObjectResponse.areaPhrase.areaNegativeValueStringProperty' );
addToMapIfDefined( 'a11y_areaUnderCurveTool_accessibleObjectResponse_areaPhrase_areaHidden', 'a11y.areaUnderCurveTool.accessibleObjectResponse.areaPhrase.areaHiddenStringProperty' );

// A function that creates contents for a new Fluent file, which will be needed if any string changes.
const createFluentFile = (): string => {
  let ftl = '';
  for (const [key, stringProperty] of fluentKeyToStringPropertyMap.entries()) {
    ftl += `${key} = ${FluentLibrary.formatMultilineForFtl( stringProperty.value )}\n`;
  }
  return ftl;
};

const fluentSupport = new FluentContainer( createFluentFile, Array.from(fluentKeyToStringPropertyMap.values()) );

const CalculusGrapherFluent = {
  "calculus-grapher": {
    titleStringProperty: _.get( CalculusGrapherStrings, 'calculus-grapher.titleStringProperty' )
  },
  _comment_0: new FluentComment( {"comment":"=======================================================================================================","associatedKey":"screen"} ),
  _comment_1: new FluentComment( {"comment":"Screen Summaries","associatedKey":"screen"} ),
  _comment_2: new FluentComment( {"comment":"=======================================================================================================","associatedKey":"screen"} ),
  screen: {
    _comment_0: new FluentComment( {"comment":"Derivative screen","associatedKey":"derivative"} ),
    derivativeStringProperty: _.get( CalculusGrapherStrings, 'screen.derivativeStringProperty' ),
    _comment_1: new FluentComment( {"comment":"Integral screen","associatedKey":"integral"} ),
    integralStringProperty: _.get( CalculusGrapherStrings, 'screen.integralStringProperty' ),
    _comment_2: new FluentComment( {"comment":"Advanced screen","associatedKey":"advanced"} ),
    advancedStringProperty: _.get( CalculusGrapherStrings, 'screen.advancedStringProperty' ),
    _comment_3: new FluentComment( {"comment":"Lab screen","associatedKey":"lab"} ),
    labStringProperty: _.get( CalculusGrapherStrings, 'screen.labStringProperty' )
  },
  smoothStringProperty: _.get( CalculusGrapherStrings, 'smoothStringProperty' ),
  symbol: {
    dStringProperty: _.get( CalculusGrapherStrings, 'symbol.dStringProperty' ),
    fStringProperty: _.get( CalculusGrapherStrings, 'symbol.fStringProperty' ),
    xStringProperty: _.get( CalculusGrapherStrings, 'symbol.xStringProperty' ),
    tStringProperty: _.get( CalculusGrapherStrings, 'symbol.tStringProperty' )
  },
  discontinuitiesStringProperty: _.get( CalculusGrapherStrings, 'discontinuitiesStringProperty' ),
  valuesStringProperty: _.get( CalculusGrapherStrings, 'valuesStringProperty' ),
  notationStringProperty: _.get( CalculusGrapherStrings, 'notationStringProperty' ),
  lagrangeStringProperty: _.get( CalculusGrapherStrings, 'lagrangeStringProperty' ),
  leibnizStringProperty: _.get( CalculusGrapherStrings, 'leibnizStringProperty' ),
  variableStringProperty: _.get( CalculusGrapherStrings, 'variableStringProperty' ),
  checkbox: {
    areaUnderCurveStringProperty: _.get( CalculusGrapherStrings, 'checkbox.areaUnderCurveStringProperty' ),
    tangentStringProperty: _.get( CalculusGrapherStrings, 'checkbox.tangentStringProperty' )
  },
  barometer: {
    netSignedAreaStringProperty: _.get( CalculusGrapherStrings, 'barometer.netSignedAreaStringProperty' ),
    slopeOfTangentStringProperty: _.get( CalculusGrapherStrings, 'barometer.slopeOfTangentStringProperty' )
  },
  _comment_3: new FluentComment( {"comment":"Curve manipulator for the predict curve","associatedKey":"predict"} ),
  predictStringProperty: _.get( CalculusGrapherStrings, 'predictStringProperty' ),
  showStringProperty: _.get( CalculusGrapherStrings, 'showStringProperty' ),
  predictPreferenceStringProperty: _.get( CalculusGrapherStrings, 'predictPreferenceStringProperty' ),
  valuesPreferenceDescriptionStringProperty: _.get( CalculusGrapherStrings, 'valuesPreferenceDescriptionStringProperty' ),
  predictPreferenceDescriptionStringProperty: _.get( CalculusGrapherStrings, 'predictPreferenceDescriptionStringProperty' ),
  _comment_4: new FluentComment( {"comment":"Reference Line","associatedKey":"referenceLine"} ),
  referenceLineStringProperty: _.get( CalculusGrapherStrings, 'referenceLineStringProperty' ),
  _comment_5: new FluentComment( {"comment":"=======================================================================================================","associatedKey":"curveManipulator"} ),
  _comment_6: new FluentComment( {"comment":"Tools","associatedKey":"curveManipulator"} ),
  _comment_7: new FluentComment( {"comment":"=======================================================================================================","associatedKey":"curveManipulator"} ),
  curveManipulator: {
    keyboardHelpHeadingStringProperty: _.get( CalculusGrapherStrings, 'curveManipulator.keyboardHelpHeadingStringProperty' ),
    keyboardHelpLabelStringProperty: _.get( CalculusGrapherStrings, 'curveManipulator.keyboardHelpLabelStringProperty' ),
    keyboardCueStringProperty: _.get( CalculusGrapherStrings, 'curveManipulator.keyboardCueStringProperty' )
  },
  explorationToolsStringProperty: _.get( CalculusGrapherStrings, 'explorationToolsStringProperty' ),
  a11y: {
    _comment_0: new FluentComment( {"comment":"=======================================================================================================","associatedKey":"screen"} ),
    _comment_1: new FluentComment( {"comment":"Screen Summaries","associatedKey":"screen"} ),
    _comment_2: new FluentComment( {"comment":"=======================================================================================================","associatedKey":"screen"} ),
    screen: {
      _comment_0: new FluentComment( {"comment":"Defaults for all screens","associatedKey":"defaults"} ),
      _comment_1: new FluentComment( {"comment":"Defaults for all graph areas","associatedKey":"defaults"} ),
      _comment_2: new FluentComment( {"comment":"Defaults for all curve manipulators","associatedKey":"defaults"} ),
      defaults: {
        screenSummary: {
          currentDetails: {
            leadingParagraph: {
              widthPattern: new FluentPattern<{ curveSentence: FluentVariable, shape: FluentVariable, width: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_screen_defaults_screenSummary_currentDetails_leadingParagraph_widthPattern', _.get( CalculusGrapherStrings, 'a11y.screen.defaults.screenSummary.currentDetails.leadingParagraph.widthPatternStringProperty' ), [{"name":"curveSentence"},{"name":"shape"},{"name":"width"}] ),
              noWidthPattern: new FluentPattern<{ curveSentence: FluentVariable, shape: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_screen_defaults_screenSummary_currentDetails_leadingParagraph_noWidthPattern', _.get( CalculusGrapherStrings, 'a11y.screen.defaults.screenSummary.currentDetails.leadingParagraph.noWidthPatternStringProperty' ), [{"name":"curveSentence"},{"name":"shape"}] ),
              curveSentence: {
                curvesShownStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_screen_defaults_screenSummary_currentDetails_leadingParagraph_curveSentence_curvesShown', _.get( CalculusGrapherStrings, 'a11y.screen.defaults.screenSummary.currentDetails.leadingParagraph.curveSentence.curvesShownStringProperty' ) ),
                allCurvesHiddenStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_screen_defaults_screenSummary_currentDetails_leadingParagraph_curveSentence_allCurvesHidden', _.get( CalculusGrapherStrings, 'a11y.screen.defaults.screenSummary.currentDetails.leadingParagraph.curveSentence.allCurvesHiddenStringProperty' ) )
              }
            },
            accessibleList: {
              _comment_0: new FluentComment( {"comment":"Curve manipulator for the primary curve","associatedKey":"primary"} ),
              primaryStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_screen_defaults_screenSummary_currentDetails_accessibleList_primary', _.get( CalculusGrapherStrings, 'a11y.screen.defaults.screenSummary.currentDetails.accessibleList.primaryStringProperty' ) ),
              _comment_1: new FluentComment( {"comment":"Curve manipulator for the predict curve","associatedKey":"predict"} ),
              predictStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_screen_defaults_screenSummary_currentDetails_accessibleList_predict', _.get( CalculusGrapherStrings, 'a11y.screen.defaults.screenSummary.currentDetails.accessibleList.predictStringProperty' ) ),
              _comment_2: new FluentComment( {"comment":"Integral screen","associatedKey":"integral"} ),
              integralStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_screen_defaults_screenSummary_currentDetails_accessibleList_integral', _.get( CalculusGrapherStrings, 'a11y.screen.defaults.screenSummary.currentDetails.accessibleList.integralStringProperty' ) ),
              _comment_3: new FluentComment( {"comment":"Derivative screen","associatedKey":"derivative"} ),
              derivativeStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_screen_defaults_screenSummary_currentDetails_accessibleList_derivative', _.get( CalculusGrapherStrings, 'a11y.screen.defaults.screenSummary.currentDetails.accessibleList.derivativeStringProperty' ) ),
              secondDerivativeStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_screen_defaults_screenSummary_currentDetails_accessibleList_secondDerivative', _.get( CalculusGrapherStrings, 'a11y.screen.defaults.screenSummary.currentDetails.accessibleList.secondDerivativeStringProperty' ) )
            }
          },
          controlAreaStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_screen_defaults_screenSummary_controlArea', _.get( CalculusGrapherStrings, 'a11y.screen.defaults.screenSummary.controlAreaStringProperty' ) )
        }
      },
      _comment_3: new FluentComment( {"comment":"Derivative screen","associatedKey":"derivative"} ),
      derivative: {
        screenButtonsHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_screen_derivative_screenButtonsHelpText', _.get( CalculusGrapherStrings, 'a11y.screen.derivative.screenButtonsHelpTextStringProperty' ) ),
        screenSummary: {
          playArea: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_screen_derivative_screenSummary_playArea', _.get( CalculusGrapherStrings, 'a11y.screen.derivative.screenSummary.playAreaStringProperty' ), [{"name":"variable"}] ),
          interactionHintStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_screen_derivative_screenSummary_interactionHint', _.get( CalculusGrapherStrings, 'a11y.screen.derivative.screenSummary.interactionHintStringProperty' ) )
        }
      },
      _comment_4: new FluentComment( {"comment":"Integral screen","associatedKey":"integral"} ),
      integral: {
        screenButtonsHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_screen_integral_screenButtonsHelpText', _.get( CalculusGrapherStrings, 'a11y.screen.integral.screenButtonsHelpTextStringProperty' ) ),
        screenSummary: {
          playArea: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_screen_integral_screenSummary_playArea', _.get( CalculusGrapherStrings, 'a11y.screen.integral.screenSummary.playAreaStringProperty' ), [{"name":"variable"}] ),
          interactionHint: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_screen_integral_screenSummary_interactionHint', _.get( CalculusGrapherStrings, 'a11y.screen.integral.screenSummary.interactionHintStringProperty' ), [{"name":"variable"}] )
        }
      },
      _comment_5: new FluentComment( {"comment":"Advanced screen","associatedKey":"advanced"} ),
      advanced: {
        screenButtonsHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_screen_advanced_screenButtonsHelpText', _.get( CalculusGrapherStrings, 'a11y.screen.advanced.screenButtonsHelpTextStringProperty' ) ),
        screenSummary: {
          playArea: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_screen_advanced_screenSummary_playArea', _.get( CalculusGrapherStrings, 'a11y.screen.advanced.screenSummary.playAreaStringProperty' ), [{"name":"variable"}] ),
          interactionHintStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_screen_advanced_screenSummary_interactionHint', _.get( CalculusGrapherStrings, 'a11y.screen.advanced.screenSummary.interactionHintStringProperty' ) )
        }
      },
      _comment_6: new FluentComment( {"comment":"Lab screen","associatedKey":"lab"} ),
      lab: {
        screenButtonsHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_screen_lab_screenButtonsHelpText', _.get( CalculusGrapherStrings, 'a11y.screen.lab.screenButtonsHelpTextStringProperty' ) ),
        screenSummary: {
          playArea: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_screen_lab_screenSummary_playArea', _.get( CalculusGrapherStrings, 'a11y.screen.lab.screenSummary.playAreaStringProperty' ), [{"name":"variable"}] ),
          interactionHintStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_screen_lab_screenSummary_interactionHint', _.get( CalculusGrapherStrings, 'a11y.screen.lab.screenSummary.interactionHintStringProperty' ) )
        }
      }
    },
    _comment_3: new FluentComment( {"comment":"=======================================================================================================","associatedKey":"headings"} ),
    _comment_4: new FluentComment( {"comment":"Accessible Headings","associatedKey":"headings"} ),
    _comment_5: new FluentComment( {"comment":"=======================================================================================================","associatedKey":"headings"} ),
    headings: {
      curveManipulationSettingsAndControlsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_headings_curveManipulationSettingsAndControls', _.get( CalculusGrapherStrings, 'a11y.headings.curveManipulationSettingsAndControlsStringProperty' ) ),
      explorationToolControlsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_headings_explorationToolControls', _.get( CalculusGrapherStrings, 'a11y.headings.explorationToolControlsStringProperty' ) ),
      explorationToolsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_headings_explorationTools', _.get( CalculusGrapherStrings, 'a11y.headings.explorationToolsStringProperty' ) )
    },
    _comment_6: new FluentComment( {"comment":"=======================================================================================================","associatedKey":"slopeOfTangentAccordionBox"} ),
    _comment_7: new FluentComment( {"comment":"Accordion Boxes","associatedKey":"slopeOfTangentAccordionBox"} ),
    _comment_8: new FluentComment( {"comment":"=======================================================================================================","associatedKey":"slopeOfTangentAccordionBox"} ),
    slopeOfTangentAccordionBox: {
      accessibleHelpTextCollapsed: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_slopeOfTangentAccordionBox_accessibleHelpTextCollapsed', _.get( CalculusGrapherStrings, 'a11y.slopeOfTangentAccordionBox.accessibleHelpTextCollapsedStringProperty' ), [{"name":"variable"}] ),
      accessibleParagraph: new FluentPattern<{ derivativeValue: FluentVariable, variable: FluentVariable, x: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_slopeOfTangentAccordionBox_accessibleParagraph', _.get( CalculusGrapherStrings, 'a11y.slopeOfTangentAccordionBox.accessibleParagraphStringProperty' ), [{"name":"derivativeValue"},{"name":"variable"},{"name":"x"}] )
    },
    netSignedAreaAccordionBox: {
      accessibleHelpTextCollapsed: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_netSignedAreaAccordionBox_accessibleHelpTextCollapsed', _.get( CalculusGrapherStrings, 'a11y.netSignedAreaAccordionBox.accessibleHelpTextCollapsedStringProperty' ), [{"name":"variable"}] ),
      accessibleParagraph: new FluentPattern<{ integralValue: FluentVariable, variable: FluentVariable, x: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_netSignedAreaAccordionBox_accessibleParagraph', _.get( CalculusGrapherStrings, 'a11y.netSignedAreaAccordionBox.accessibleParagraphStringProperty' ), [{"name":"integralValue"},{"name":"variable"},{"name":"x"}] )
    },
    _comment_9: new FluentComment( {"comment":"=======================================================================================================","associatedKey":"curveActionsButtonGroup"} ),
    _comment_10: new FluentComment( {"comment":"Buttons","associatedKey":"curveActionsButtonGroup"} ),
    _comment_11: new FluentComment( {"comment":"=======================================================================================================","associatedKey":"curveActionsButtonGroup"} ),
    _comment_12: new FluentComment( {"comment":"Push buttons at the bottom of the control panel.","associatedKey":"curveActionsButtonGroup"} ),
    curveActionsButtonGroup: {
      accessibleHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveActionsButtonGroup_accessibleHeading', _.get( CalculusGrapherStrings, 'a11y.curveActionsButtonGroup.accessibleHeadingStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveActionsButtonGroup_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.curveActionsButtonGroup.accessibleHelpTextStringProperty' ) )
    },
    smoothButton: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_smoothButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.smoothButton.accessibleNameStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_smoothButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.smoothButton.accessibleHelpTextStringProperty' ) ),
      accessibleContextResponse: {
        allCurvesStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_smoothButton_accessibleContextResponse_allCurves', _.get( CalculusGrapherStrings, 'a11y.smoothButton.accessibleContextResponse.allCurvesStringProperty' ) ),
        predictCurveStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_smoothButton_accessibleContextResponse_predictCurve', _.get( CalculusGrapherStrings, 'a11y.smoothButton.accessibleContextResponse.predictCurveStringProperty' ) )
      }
    },
    eraserButton: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_eraserButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.eraserButton.accessibleNameStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_eraserButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.eraserButton.accessibleHelpTextStringProperty' ) ),
      accessibleContextResponse: {
        primaryCurveStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_eraserButton_accessibleContextResponse_primaryCurve', _.get( CalculusGrapherStrings, 'a11y.eraserButton.accessibleContextResponse.primaryCurveStringProperty' ) ),
        predictCurveStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_eraserButton_accessibleContextResponse_predictCurve', _.get( CalculusGrapherStrings, 'a11y.eraserButton.accessibleContextResponse.predictCurveStringProperty' ) )
      }
    },
    undoButton: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_undoButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.undoButton.accessibleNameStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_undoButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.undoButton.accessibleHelpTextStringProperty' ) ),
      accessibleContextResponse: {
        primaryCurveStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_undoButton_accessibleContextResponse_primaryCurve', _.get( CalculusGrapherStrings, 'a11y.undoButton.accessibleContextResponse.primaryCurveStringProperty' ) ),
        predictCurveStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_undoButton_accessibleContextResponse_predictCurve', _.get( CalculusGrapherStrings, 'a11y.undoButton.accessibleContextResponse.predictCurveStringProperty' ) )
      }
    },
    _comment_13: new FluentComment( {"comment":"Controls visibility of curves on a graph, and the accessible name is specific to the graph.","associatedKey":"eyeToggleButton"} ),
    eyeToggleButton: {
      accessibleNameOn: {
        _comment_0: new FluentComment( {"comment":"Integral screen","associatedKey":"integral"} ),
        integralStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_eyeToggleButton_accessibleNameOn_integral', _.get( CalculusGrapherStrings, 'a11y.eyeToggleButton.accessibleNameOn.integralStringProperty' ) ),
        _comment_1: new FluentComment( {"comment":"Curve manipulator for the primary curve","associatedKey":"primary"} ),
        primaryStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_eyeToggleButton_accessibleNameOn_primary', _.get( CalculusGrapherStrings, 'a11y.eyeToggleButton.accessibleNameOn.primaryStringProperty' ) ),
        _comment_2: new FluentComment( {"comment":"Derivative screen","associatedKey":"derivative"} ),
        derivativeStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_eyeToggleButton_accessibleNameOn_derivative', _.get( CalculusGrapherStrings, 'a11y.eyeToggleButton.accessibleNameOn.derivativeStringProperty' ) ),
        secondDerivativeStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_eyeToggleButton_accessibleNameOn_secondDerivative', _.get( CalculusGrapherStrings, 'a11y.eyeToggleButton.accessibleNameOn.secondDerivativeStringProperty' ) )
      },
      accessibleNameOff: {
        _comment_0: new FluentComment( {"comment":"Integral screen","associatedKey":"integral"} ),
        integralStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_eyeToggleButton_accessibleNameOff_integral', _.get( CalculusGrapherStrings, 'a11y.eyeToggleButton.accessibleNameOff.integralStringProperty' ) ),
        _comment_1: new FluentComment( {"comment":"Curve manipulator for the primary curve","associatedKey":"primary"} ),
        primaryStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_eyeToggleButton_accessibleNameOff_primary', _.get( CalculusGrapherStrings, 'a11y.eyeToggleButton.accessibleNameOff.primaryStringProperty' ) ),
        _comment_2: new FluentComment( {"comment":"Derivative screen","associatedKey":"derivative"} ),
        derivativeStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_eyeToggleButton_accessibleNameOff_derivative', _.get( CalculusGrapherStrings, 'a11y.eyeToggleButton.accessibleNameOff.derivativeStringProperty' ) ),
        secondDerivativeStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_eyeToggleButton_accessibleNameOff_secondDerivative', _.get( CalculusGrapherStrings, 'a11y.eyeToggleButton.accessibleNameOff.secondDerivativeStringProperty' ) )
      },
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_eyeToggleButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.eyeToggleButton.accessibleHelpTextStringProperty' ) ),
      accessibleContextResponseOffStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_eyeToggleButton_accessibleContextResponseOff', _.get( CalculusGrapherStrings, 'a11y.eyeToggleButton.accessibleContextResponseOffStringProperty' ) ),
      accessibleContextResponseOnStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_eyeToggleButton_accessibleContextResponseOn', _.get( CalculusGrapherStrings, 'a11y.eyeToggleButton.accessibleContextResponseOnStringProperty' ) )
    },
    _comment_14: new FluentComment( {"comment":"Zooms the y-axis of a graph, and the accessibleName is specific to the graph.","associatedKey":"yZoomButtonGroup"} ),
    yZoomButtonGroup: {
      zoomInButton: {
        accessibleName: {
          _comment_0: new FluentComment( {"comment":"Integral screen","associatedKey":"integral"} ),
          integralStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_yZoomButtonGroup_zoomInButton_accessibleName_integral', _.get( CalculusGrapherStrings, 'a11y.yZoomButtonGroup.zoomInButton.accessibleName.integralStringProperty' ) ),
          _comment_1: new FluentComment( {"comment":"Derivative screen","associatedKey":"derivative"} ),
          derivativeStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_yZoomButtonGroup_zoomInButton_accessibleName_derivative', _.get( CalculusGrapherStrings, 'a11y.yZoomButtonGroup.zoomInButton.accessibleName.derivativeStringProperty' ) ),
          secondDerivativeStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_yZoomButtonGroup_zoomInButton_accessibleName_secondDerivative', _.get( CalculusGrapherStrings, 'a11y.yZoomButtonGroup.zoomInButton.accessibleName.secondDerivativeStringProperty' ) )
        },
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_yZoomButtonGroup_zoomInButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.yZoomButtonGroup.zoomInButton.accessibleHelpTextStringProperty' ) ),
        accessibleContextResponse: new FluentPattern<{ max: FluentVariable, min: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_yZoomButtonGroup_zoomInButton_accessibleContextResponse', _.get( CalculusGrapherStrings, 'a11y.yZoomButtonGroup.zoomInButton.accessibleContextResponseStringProperty' ), [{"name":"max"},{"name":"min"}] )
      },
      zoomOutButton: {
        accessibleName: {
          _comment_0: new FluentComment( {"comment":"Integral screen","associatedKey":"integral"} ),
          integralStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_yZoomButtonGroup_zoomOutButton_accessibleName_integral', _.get( CalculusGrapherStrings, 'a11y.yZoomButtonGroup.zoomOutButton.accessibleName.integralStringProperty' ) ),
          _comment_1: new FluentComment( {"comment":"Derivative screen","associatedKey":"derivative"} ),
          derivativeStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_yZoomButtonGroup_zoomOutButton_accessibleName_derivative', _.get( CalculusGrapherStrings, 'a11y.yZoomButtonGroup.zoomOutButton.accessibleName.derivativeStringProperty' ) ),
          secondDerivativeStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_yZoomButtonGroup_zoomOutButton_accessibleName_secondDerivative', _.get( CalculusGrapherStrings, 'a11y.yZoomButtonGroup.zoomOutButton.accessibleName.secondDerivativeStringProperty' ) )
        },
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_yZoomButtonGroup_zoomOutButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.yZoomButtonGroup.zoomOutButton.accessibleHelpTextStringProperty' ) ),
        accessibleContextResponse: new FluentPattern<{ max: FluentVariable, min: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_yZoomButtonGroup_zoomOutButton_accessibleContextResponse', _.get( CalculusGrapherStrings, 'a11y.yZoomButtonGroup.zoomOutButton.accessibleContextResponseStringProperty' ), [{"name":"max"},{"name":"min"}] )
      }
    },
    _comment_15: new FluentComment( {"comment":"=======================================================================================================","associatedKey":"tangentCheckbox"} ),
    _comment_16: new FluentComment( {"comment":"Checkboxes","associatedKey":"tangentCheckbox"} ),
    _comment_17: new FluentComment( {"comment":"=======================================================================================================","associatedKey":"tangentCheckbox"} ),
    tangentCheckbox: {
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_tangentCheckbox_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.tangentCheckbox.accessibleHelpTextStringProperty' ) ),
      accessibleContextResponseCheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_tangentCheckbox_accessibleContextResponseChecked', _.get( CalculusGrapherStrings, 'a11y.tangentCheckbox.accessibleContextResponseCheckedStringProperty' ) ),
      accessibleContextResponseUncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_tangentCheckbox_accessibleContextResponseUnchecked', _.get( CalculusGrapherStrings, 'a11y.tangentCheckbox.accessibleContextResponseUncheckedStringProperty' ) )
    },
    referenceLineCheckbox: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_referenceLineCheckbox_accessibleName', _.get( CalculusGrapherStrings, 'a11y.referenceLineCheckbox.accessibleNameStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_referenceLineCheckbox_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.referenceLineCheckbox.accessibleHelpTextStringProperty' ) ),
      accessibleContextResponseCheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_referenceLineCheckbox_accessibleContextResponseChecked', _.get( CalculusGrapherStrings, 'a11y.referenceLineCheckbox.accessibleContextResponseCheckedStringProperty' ) ),
      accessibleContextResponseUncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_referenceLineCheckbox_accessibleContextResponseUnchecked', _.get( CalculusGrapherStrings, 'a11y.referenceLineCheckbox.accessibleContextResponseUncheckedStringProperty' ) )
    },
    areaUnderCurveCheckbox: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_areaUnderCurveCheckbox_accessibleName', _.get( CalculusGrapherStrings, 'a11y.areaUnderCurveCheckbox.accessibleNameStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_areaUnderCurveCheckbox_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.areaUnderCurveCheckbox.accessibleHelpTextStringProperty' ) ),
      accessibleContextResponseCheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_areaUnderCurveCheckbox_accessibleContextResponseChecked', _.get( CalculusGrapherStrings, 'a11y.areaUnderCurveCheckbox.accessibleContextResponseCheckedStringProperty' ) ),
      accessibleContextResponseUncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_areaUnderCurveCheckbox_accessibleContextResponseUnchecked', _.get( CalculusGrapherStrings, 'a11y.areaUnderCurveCheckbox.accessibleContextResponseUncheckedStringProperty' ) )
    },
    gridCheckbox: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gridCheckbox_accessibleName', _.get( CalculusGrapherStrings, 'a11y.gridCheckbox.accessibleNameStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gridCheckbox_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.gridCheckbox.accessibleHelpTextStringProperty' ) ),
      accessibleContextResponseCheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gridCheckbox_accessibleContextResponseChecked', _.get( CalculusGrapherStrings, 'a11y.gridCheckbox.accessibleContextResponseCheckedStringProperty' ) ),
      accessibleContextResponseUncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gridCheckbox_accessibleContextResponseUnchecked', _.get( CalculusGrapherStrings, 'a11y.gridCheckbox.accessibleContextResponseUncheckedStringProperty' ) )
    },
    showOriginalCurveCheckbox: {
      accessibleName: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_showOriginalCurveCheckbox_accessibleName', _.get( CalculusGrapherStrings, 'a11y.showOriginalCurveCheckbox.accessibleNameStringProperty' ), [{"name":"variable"}] ),
      accessibleHelpText: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_showOriginalCurveCheckbox_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.showOriginalCurveCheckbox.accessibleHelpTextStringProperty' ), [{"name":"variable"}] ),
      accessibleContextResponseChecked: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_showOriginalCurveCheckbox_accessibleContextResponseChecked', _.get( CalculusGrapherStrings, 'a11y.showOriginalCurveCheckbox.accessibleContextResponseCheckedStringProperty' ), [{"name":"variable"}] ),
      accessibleContextResponseUnchecked: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_showOriginalCurveCheckbox_accessibleContextResponseUnchecked', _.get( CalculusGrapherStrings, 'a11y.showOriginalCurveCheckbox.accessibleContextResponseUncheckedStringProperty' ), [{"name":"variable"}] )
    },
    _comment_18: new FluentComment( {"comment":"=======================================================================================================","associatedKey":"graphArea"} ),
    _comment_19: new FluentComment( {"comment":"Graph Areas","associatedKey":"graphArea"} ),
    _comment_20: new FluentComment( {"comment":"=======================================================================================================","associatedKey":"graphArea"} ),
    graphArea: {
      _comment_0: new FluentComment( {"comment":"Defaults for all screens","associatedKey":"defaults"} ),
      _comment_1: new FluentComment( {"comment":"Defaults for all graph areas","associatedKey":"defaults"} ),
      _comment_2: new FluentComment( {"comment":"Defaults for all curve manipulators","associatedKey":"defaults"} ),
      defaults: {
        accessibleList: {
          leadingParagraphStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_graphArea_defaults_accessibleList_leadingParagraph', _.get( CalculusGrapherStrings, 'a11y.graphArea.defaults.accessibleList.leadingParagraphStringProperty' ) ),
          coordinateGridShownStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_graphArea_defaults_accessibleList_coordinateGridShown', _.get( CalculusGrapherStrings, 'a11y.graphArea.defaults.accessibleList.coordinateGridShownStringProperty' ) ),
          valuesLabeledOnAxesStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_graphArea_defaults_accessibleList_valuesLabeledOnAxes', _.get( CalculusGrapherStrings, 'a11y.graphArea.defaults.accessibleList.valuesLabeledOnAxesStringProperty' ) )
        }
      },
      _comment_3: new FluentComment( {"comment":"Curve manipulator for the primary curve","associatedKey":"primary"} ),
      primary: {
        accessibleHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_graphArea_primary_accessibleHeading', _.get( CalculusGrapherStrings, 'a11y.graphArea.primary.accessibleHeadingStringProperty' ) ),
        accessibleList: {
          primaryCurve: {
            continuousAndDifferentiableStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_graphArea_primary_accessibleList_primaryCurve_continuousAndDifferentiable', _.get( CalculusGrapherStrings, 'a11y.graphArea.primary.accessibleList.primaryCurve.continuousAndDifferentiableStringProperty' ) ),
            continuousAndNotDifferentiable: new FluentPattern<{ numberOfCusps: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_graphArea_primary_accessibleList_primaryCurve_continuousAndNotDifferentiable', _.get( CalculusGrapherStrings, 'a11y.graphArea.primary.accessibleList.primaryCurve.continuousAndNotDifferentiableStringProperty' ), [{"name":"numberOfCusps"}] ),
            discontinuousAndNotDifferentiable: new FluentPattern<{ numberOfCusps: FluentVariable, numberOfDiscontinuities: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_graphArea_primary_accessibleList_primaryCurve_discontinuousAndNotDifferentiable', _.get( CalculusGrapherStrings, 'a11y.graphArea.primary.accessibleList.primaryCurve.discontinuousAndNotDifferentiableStringProperty' ), [{"name":"numberOfCusps"},{"name":"numberOfDiscontinuities"}] ),
            hiddenStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_graphArea_primary_accessibleList_primaryCurve_hidden', _.get( CalculusGrapherStrings, 'a11y.graphArea.primary.accessibleList.primaryCurve.hiddenStringProperty' ) )
          },
          predictCurve: {
            continuousAndDifferentiableStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_graphArea_primary_accessibleList_predictCurve_continuousAndDifferentiable', _.get( CalculusGrapherStrings, 'a11y.graphArea.primary.accessibleList.predictCurve.continuousAndDifferentiableStringProperty' ) ),
            continuousAndNotDifferentiable: new FluentPattern<{ numberOfCusps: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_graphArea_primary_accessibleList_predictCurve_continuousAndNotDifferentiable', _.get( CalculusGrapherStrings, 'a11y.graphArea.primary.accessibleList.predictCurve.continuousAndNotDifferentiableStringProperty' ), [{"name":"numberOfCusps"}] ),
            discontinuousAndNotDifferentiable: new FluentPattern<{ numberOfCusps: FluentVariable, numberOfDiscontinuities: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_graphArea_primary_accessibleList_predictCurve_discontinuousAndNotDifferentiable', _.get( CalculusGrapherStrings, 'a11y.graphArea.primary.accessibleList.predictCurve.discontinuousAndNotDifferentiableStringProperty' ), [{"name":"numberOfCusps"},{"name":"numberOfDiscontinuities"}] ),
            hiddenStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_graphArea_primary_accessibleList_predictCurve_hidden', _.get( CalculusGrapherStrings, 'a11y.graphArea.primary.accessibleList.predictCurve.hiddenStringProperty' ) )
          }
        }
      },
      _comment_4: new FluentComment( {"comment":"Integral screen","associatedKey":"integral"} ),
      integral: {
        accessibleHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_graphArea_integral_accessibleHeading', _.get( CalculusGrapherStrings, 'a11y.graphArea.integral.accessibleHeadingStringProperty' ) ),
        accessibleList: {
          continuous: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_graphArea_integral_accessibleList_continuous', _.get( CalculusGrapherStrings, 'a11y.graphArea.integral.accessibleList.continuousStringProperty' ), [{"name":"variable"}] ),
          hiddenStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_graphArea_integral_accessibleList_hidden', _.get( CalculusGrapherStrings, 'a11y.graphArea.integral.accessibleList.hiddenStringProperty' ) )
        }
      },
      _comment_5: new FluentComment( {"comment":"Derivative screen","associatedKey":"derivative"} ),
      derivative: {
        accessibleHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_graphArea_derivative_accessibleHeading', _.get( CalculusGrapherStrings, 'a11y.graphArea.derivative.accessibleHeadingStringProperty' ) ),
        accessibleList: {
          continuousAndDifferentiableStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_graphArea_derivative_accessibleList_continuousAndDifferentiable', _.get( CalculusGrapherStrings, 'a11y.graphArea.derivative.accessibleList.continuousAndDifferentiableStringProperty' ) ),
          discontinuousAndNotDifferentiable: new FluentPattern<{ numberOfDiscontinuities: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_graphArea_derivative_accessibleList_discontinuousAndNotDifferentiable', _.get( CalculusGrapherStrings, 'a11y.graphArea.derivative.accessibleList.discontinuousAndNotDifferentiableStringProperty' ), [{"name":"numberOfDiscontinuities"}] ),
          hiddenStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_graphArea_derivative_accessibleList_hidden', _.get( CalculusGrapherStrings, 'a11y.graphArea.derivative.accessibleList.hiddenStringProperty' ) )
        }
      },
      secondDerivative: {
        accessibleHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_graphArea_secondDerivative_accessibleHeading', _.get( CalculusGrapherStrings, 'a11y.graphArea.secondDerivative.accessibleHeadingStringProperty' ) ),
        accessibleList: {
          continuousAndDifferentiableStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_graphArea_secondDerivative_accessibleList_continuousAndDifferentiable', _.get( CalculusGrapherStrings, 'a11y.graphArea.secondDerivative.accessibleList.continuousAndDifferentiableStringProperty' ) ),
          discontinuousAndNotDifferentiable: new FluentPattern<{ numberOfDiscontinuities: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_graphArea_secondDerivative_accessibleList_discontinuousAndNotDifferentiable', _.get( CalculusGrapherStrings, 'a11y.graphArea.secondDerivative.accessibleList.discontinuousAndNotDifferentiableStringProperty' ), [{"name":"numberOfDiscontinuities"}] ),
          hiddenStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_graphArea_secondDerivative_accessibleList_hidden', _.get( CalculusGrapherStrings, 'a11y.graphArea.secondDerivative.accessibleList.hiddenStringProperty' ) )
        }
      }
    },
    _comment_21: new FluentComment( {"comment":"=======================================================================================================","associatedKey":"predictRadioButtonGroup"} ),
    _comment_22: new FluentComment( {"comment":"Radio Button Groups","associatedKey":"predictRadioButtonGroup"} ),
    _comment_23: new FluentComment( {"comment":"=======================================================================================================","associatedKey":"predictRadioButtonGroup"} ),
    _comment_24: new FluentComment( {"comment":"Switch between f(x) and Predict curves","associatedKey":"predictRadioButtonGroup"} ),
    predictRadioButtonGroup: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_predictRadioButtonGroup_accessibleName', _.get( CalculusGrapherStrings, 'a11y.predictRadioButtonGroup.accessibleNameStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_predictRadioButtonGroup_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.predictRadioButtonGroup.accessibleHelpTextStringProperty' ) ),
      originalCurveRadioButton: {
        accessibleName: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_predictRadioButtonGroup_originalCurveRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.predictRadioButtonGroup.originalCurveRadioButton.accessibleNameStringProperty' ), [{"name":"variable"}] ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_predictRadioButtonGroup_originalCurveRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.predictRadioButtonGroup.originalCurveRadioButton.accessibleHelpTextStringProperty' ) )
      },
      predictCurveRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_predictRadioButtonGroup_predictCurveRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.predictRadioButtonGroup.predictCurveRadioButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_predictRadioButtonGroup_predictCurveRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.predictRadioButtonGroup.predictCurveRadioButton.accessibleHelpTextStringProperty' ) )
      }
    },
    _comment_25: new FluentComment( {"comment":"Select the shape to add to the curve in the primary graph area.","associatedKey":"shapesRadioButtonGroup"} ),
    shapesRadioButtonGroup: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_shapesRadioButtonGroup_accessibleName', _.get( CalculusGrapherStrings, 'a11y.shapesRadioButtonGroup.accessibleNameStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_shapesRadioButtonGroup_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.shapesRadioButtonGroup.accessibleHelpTextStringProperty' ) ),
      hillRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_shapesRadioButtonGroup_hillRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.shapesRadioButtonGroup.hillRadioButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_shapesRadioButtonGroup_hillRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.shapesRadioButtonGroup.hillRadioButton.accessibleHelpTextStringProperty' ) )
      },
      triangleRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_shapesRadioButtonGroup_triangleRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.shapesRadioButtonGroup.triangleRadioButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_shapesRadioButtonGroup_triangleRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.shapesRadioButtonGroup.triangleRadioButton.accessibleHelpTextStringProperty' ) )
      },
      pedestalRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_shapesRadioButtonGroup_pedestalRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.shapesRadioButtonGroup.pedestalRadioButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_shapesRadioButtonGroup_pedestalRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.shapesRadioButtonGroup.pedestalRadioButton.accessibleHelpTextStringProperty' ) )
      },
      parabolaRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_shapesRadioButtonGroup_parabolaRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.shapesRadioButtonGroup.parabolaRadioButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_shapesRadioButtonGroup_parabolaRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.shapesRadioButtonGroup.parabolaRadioButton.accessibleHelpTextStringProperty' ) )
      },
      sinusoidRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_shapesRadioButtonGroup_sinusoidRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.shapesRadioButtonGroup.sinusoidRadioButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_shapesRadioButtonGroup_sinusoidRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.shapesRadioButtonGroup.sinusoidRadioButton.accessibleHelpTextStringProperty' ) )
      },
      freeformRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_shapesRadioButtonGroup_freeformRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.shapesRadioButtonGroup.freeformRadioButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_shapesRadioButtonGroup_freeformRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.shapesRadioButtonGroup.freeformRadioButton.accessibleHelpTextStringProperty' ) )
      },
      tiltRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_shapesRadioButtonGroup_tiltRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.shapesRadioButtonGroup.tiltRadioButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_shapesRadioButtonGroup_tiltRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.shapesRadioButtonGroup.tiltRadioButton.accessibleHelpTextStringProperty' ) )
      },
      shiftRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_shapesRadioButtonGroup_shiftRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.shapesRadioButtonGroup.shiftRadioButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_shapesRadioButtonGroup_shiftRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.shapesRadioButtonGroup.shiftRadioButton.accessibleHelpTextStringProperty' ) )
      }
    },
    _comment_26: new FluentComment( {"comment":"Select the set of graphs that are visible.","associatedKey":"graphSetRadioButtonGroup"} ),
    graphSetRadioButtonGroup: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_graphSetRadioButtonGroup_accessibleName', _.get( CalculusGrapherStrings, 'a11y.graphSetRadioButtonGroup.accessibleNameStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_graphSetRadioButtonGroup_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.graphSetRadioButtonGroup.accessibleHelpTextStringProperty' ) ),
      integralPrimaryRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_graphSetRadioButtonGroup_integralPrimaryRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.graphSetRadioButtonGroup.integralPrimaryRadioButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_graphSetRadioButtonGroup_integralPrimaryRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.graphSetRadioButtonGroup.integralPrimaryRadioButton.accessibleHelpTextStringProperty' ) )
      },
      primaryDerivativeRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_graphSetRadioButtonGroup_primaryDerivativeRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.graphSetRadioButtonGroup.primaryDerivativeRadioButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_graphSetRadioButtonGroup_primaryDerivativeRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.graphSetRadioButtonGroup.primaryDerivativeRadioButton.accessibleHelpTextStringProperty' ) )
      },
      integralPrimaryDerivativeRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_graphSetRadioButtonGroup_integralPrimaryDerivativeRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.graphSetRadioButtonGroup.integralPrimaryDerivativeRadioButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_graphSetRadioButtonGroup_integralPrimaryDerivativeRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.graphSetRadioButtonGroup.integralPrimaryDerivativeRadioButton.accessibleHelpTextStringProperty' ) )
      },
      primaryDerivativeSecondDerivativeRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_graphSetRadioButtonGroup_primaryDerivativeSecondDerivativeRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.graphSetRadioButtonGroup.primaryDerivativeSecondDerivativeRadioButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_graphSetRadioButtonGroup_primaryDerivativeSecondDerivativeRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.graphSetRadioButtonGroup.primaryDerivativeSecondDerivativeRadioButton.accessibleHelpTextStringProperty' ) )
      }
    },
    _comment_27: new FluentComment( {"comment":"Variable control in Preferences > Simulation","associatedKey":"variableRadioButtonGroup"} ),
    variableRadioButtonGroup: {
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_variableRadioButtonGroup_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.variableRadioButtonGroup.accessibleHelpTextStringProperty' ) ),
      xRadioButton: {
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_variableRadioButtonGroup_xRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.variableRadioButtonGroup.xRadioButton.accessibleHelpTextStringProperty' ) )
      },
      tRadioButton: {
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_variableRadioButtonGroup_tRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.variableRadioButtonGroup.tRadioButton.accessibleHelpTextStringProperty' ) )
      }
    },
    _comment_28: new FluentComment( {"comment":"Notation control in Preferences > Simulation","associatedKey":"notationRadioButtonGroup"} ),
    notationRadioButtonGroup: {
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_notationRadioButtonGroup_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.notationRadioButtonGroup.accessibleHelpTextStringProperty' ) ),
      lagrangeRadioButton: {
        accessibleName: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_notationRadioButtonGroup_lagrangeRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.notationRadioButtonGroup.lagrangeRadioButton.accessibleNameStringProperty' ), [{"name":"variable"}] ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_notationRadioButtonGroup_lagrangeRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.notationRadioButtonGroup.lagrangeRadioButton.accessibleHelpTextStringProperty' ) )
      },
      leibnizRadioButton: {
        accessibleName: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_notationRadioButtonGroup_leibnizRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.notationRadioButtonGroup.leibnizRadioButton.accessibleNameStringProperty' ), [{"name":"variable"}] ),
        accessibleHelpText: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_notationRadioButtonGroup_leibnizRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.notationRadioButtonGroup.leibnizRadioButton.accessibleHelpTextStringProperty' ), [{"name":"variable"}] )
      }
    },
    _comment_29: new FluentComment( {"comment":"Discontinuities control in Preferences > Simulation","associatedKey":"discontinuitiesRadioButtonGroup"} ),
    discontinuitiesRadioButtonGroup: {
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_discontinuitiesRadioButtonGroup_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.discontinuitiesRadioButtonGroup.accessibleHelpTextStringProperty' ) ),
      noLineRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_discontinuitiesRadioButtonGroup_noLineRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.discontinuitiesRadioButtonGroup.noLineRadioButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_discontinuitiesRadioButtonGroup_noLineRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.discontinuitiesRadioButtonGroup.noLineRadioButton.accessibleHelpTextStringProperty' ) )
      },
      dashedLineRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_discontinuitiesRadioButtonGroup_dashedLineRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.discontinuitiesRadioButtonGroup.dashedLineRadioButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_discontinuitiesRadioButtonGroup_dashedLineRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.discontinuitiesRadioButtonGroup.dashedLineRadioButton.accessibleHelpTextStringProperty' ) )
      }
    },
    _comment_30: new FluentComment( {"comment":"=======================================================================================================","associatedKey":"shapeWidthSlider"} ),
    _comment_31: new FluentComment( {"comment":"Sliders","associatedKey":"shapeWidthSlider"} ),
    _comment_32: new FluentComment( {"comment":"=======================================================================================================","associatedKey":"shapeWidthSlider"} ),
    shapeWidthSlider: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_shapeWidthSlider_accessibleName', _.get( CalculusGrapherStrings, 'a11y.shapeWidthSlider.accessibleNameStringProperty' ) ),
      accessibleHelpText: new FluentPattern<{ max: FluentVariable, min: FluentVariable, variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_shapeWidthSlider_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.shapeWidthSlider.accessibleHelpTextStringProperty' ), [{"name":"max"},{"name":"min"},{"name":"variable"}] )
    },
    _comment_33: new FluentComment( {"comment":"=======================================================================================================","associatedKey":"predictToggleSwitch"} ),
    _comment_34: new FluentComment( {"comment":"Switches","associatedKey":"predictToggleSwitch"} ),
    _comment_35: new FluentComment( {"comment":"=======================================================================================================","associatedKey":"predictToggleSwitch"} ),
    _comment_36: new FluentComment( {"comment":"Predict control in Preferences > Simulation","associatedKey":"predictToggleSwitch"} ),
    predictToggleSwitch: {
      accessibleHelpText: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_predictToggleSwitch_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.predictToggleSwitch.accessibleHelpTextStringProperty' ), [{"name":"variable"}] )
    },
    _comment_37: new FluentComment( {"comment":"=======================================================================================================","associatedKey":"curveManipulator"} ),
    _comment_38: new FluentComment( {"comment":"Tools","associatedKey":"curveManipulator"} ),
    _comment_39: new FluentComment( {"comment":"=======================================================================================================","associatedKey":"curveManipulator"} ),
    curveManipulator: {
      _comment_0: new FluentComment( {"comment":"Defaults for all screens","associatedKey":"defaults"} ),
      _comment_1: new FluentComment( {"comment":"Defaults for all graph areas","associatedKey":"defaults"} ),
      _comment_2: new FluentComment( {"comment":"Defaults for all curve manipulators","associatedKey":"defaults"} ),
      defaults: {
        accessibleObjectResponse: {
          focusedReleased: new FluentPattern<{ x: FluentVariable, y: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_curveManipulator_defaults_accessibleObjectResponse_focusedReleased', _.get( CalculusGrapherStrings, 'a11y.curveManipulator.defaults.accessibleObjectResponse.focusedReleasedStringProperty' ), [{"name":"x"},{"name":"y"}] ),
          focusedGrabbed: new FluentPattern<{ x: FluentVariable, y: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_curveManipulator_defaults_accessibleObjectResponse_focusedGrabbed', _.get( CalculusGrapherStrings, 'a11y.curveManipulator.defaults.accessibleObjectResponse.focusedGrabbedStringProperty' ), [{"name":"x"},{"name":"y"}] ),
          grabbed: new FluentPattern<{ x: FluentVariable, y: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_curveManipulator_defaults_accessibleObjectResponse_grabbed', _.get( CalculusGrapherStrings, 'a11y.curveManipulator.defaults.accessibleObjectResponse.grabbedStringProperty' ), [{"name":"x"},{"name":"y"}] ),
          released: new FluentPattern<{ x: FluentVariable, y: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_curveManipulator_defaults_accessibleObjectResponse_released', _.get( CalculusGrapherStrings, 'a11y.curveManipulator.defaults.accessibleObjectResponse.releasedStringProperty' ), [{"name":"x"},{"name":"y"}] ),
          movedReleased: new FluentPattern<{ x: FluentVariable, y: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_curveManipulator_defaults_accessibleObjectResponse_movedReleased', _.get( CalculusGrapherStrings, 'a11y.curveManipulator.defaults.accessibleObjectResponse.movedReleasedStringProperty' ), [{"name":"x"},{"name":"y"}] ),
          movedGrabbed: new FluentPattern<{ x: FluentVariable, y: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_curveManipulator_defaults_accessibleObjectResponse_movedGrabbed', _.get( CalculusGrapherStrings, 'a11y.curveManipulator.defaults.accessibleObjectResponse.movedGrabbedStringProperty' ), [{"name":"x"},{"name":"y"}] )
        }
      },
      _comment_3: new FluentComment( {"comment":"Curve manipulator for the primary curve","associatedKey":"primary"} ),
      primary: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulator_primary_accessibleName', _.get( CalculusGrapherStrings, 'a11y.curveManipulator.primary.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulator_primary_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.curveManipulator.primary.accessibleHelpTextStringProperty' ) )
      },
      _comment_4: new FluentComment( {"comment":"Curve manipulator for the predict curve","associatedKey":"predict"} ),
      predict: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulator_predict_accessibleName', _.get( CalculusGrapherStrings, 'a11y.curveManipulator.predict.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulator_predict_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.curveManipulator.predict.accessibleHelpTextStringProperty' ) )
      }
    },
    _comment_40: new FluentComment( {"comment":"Reference Line","associatedKey":"referenceLine"} ),
    referenceLine: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_referenceLine_accessibleName', _.get( CalculusGrapherStrings, 'a11y.referenceLine.accessibleNameStringProperty' ) ),
      accessibleHelpText: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_referenceLine_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.referenceLine.accessibleHelpTextStringProperty' ), [{"name":"variable"}] ),
      accessibleObjectResponse: {
        _comment_0: new FluentComment( {"comment":"Each graph set has an associated pattern with phrase placeholders that define the general form of the response.","associatedKey":"patterns"} ),
        patterns: {
          primaryDerivative: new FluentPattern<{ derivativePhrase: FluentVariable, primaryPhrase: FluentVariable, xPhrase: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_referenceLine_accessibleObjectResponse_patterns_primaryDerivative', _.get( CalculusGrapherStrings, 'a11y.referenceLine.accessibleObjectResponse.patterns.primaryDerivativeStringProperty' ), [{"name":"derivativePhrase"},{"name":"primaryPhrase"},{"name":"xPhrase"}] ),
          integralPrimary: new FluentPattern<{ integralPhrase: FluentVariable, primaryPhrase: FluentVariable, xPhrase: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_referenceLine_accessibleObjectResponse_patterns_integralPrimary', _.get( CalculusGrapherStrings, 'a11y.referenceLine.accessibleObjectResponse.patterns.integralPrimaryStringProperty' ), [{"name":"integralPhrase"},{"name":"primaryPhrase"},{"name":"xPhrase"}] ),
          integralPrimaryDerivative: new FluentPattern<{ derivativePhrase: FluentVariable, integralPhrase: FluentVariable, primaryPhrase: FluentVariable, xPhrase: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_referenceLine_accessibleObjectResponse_patterns_integralPrimaryDerivative', _.get( CalculusGrapherStrings, 'a11y.referenceLine.accessibleObjectResponse.patterns.integralPrimaryDerivativeStringProperty' ), [{"name":"derivativePhrase"},{"name":"integralPhrase"},{"name":"primaryPhrase"},{"name":"xPhrase"}] ),
          primaryDerivativeSecondDerivative: new FluentPattern<{ derivativePhrase: FluentVariable, primaryPhrase: FluentVariable, secondDerivativePhrase: FluentVariable, xPhrase: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_referenceLine_accessibleObjectResponse_patterns_primaryDerivativeSecondDerivative', _.get( CalculusGrapherStrings, 'a11y.referenceLine.accessibleObjectResponse.patterns.primaryDerivativeSecondDerivativeStringProperty' ), [{"name":"derivativePhrase"},{"name":"primaryPhrase"},{"name":"secondDerivativePhrase"},{"name":"xPhrase"}] )
        },
        _comment_1: new FluentComment( {"comment":"Phrases that are substituted into referenceLineTool.accessibleObjectResponse.patterns.*","associatedKey":"xPhrase"} ),
        _comment_2: new FluentComment( {"comment":"Phrases that are substituted into tangentTool.accessibleObjectResponse.pattern","associatedKey":"xPhrase"} ),
        _comment_3: new FluentComment( {"comment":"Phrases that are substituted into areaUnderCurveTool.accessibleObjectResponse.pattern","associatedKey":"xPhrase"} ),
        xPhrase: new FluentPattern<{ value: FluentVariable, variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_referenceLine_accessibleObjectResponse_xPhrase', _.get( CalculusGrapherStrings, 'a11y.referenceLine.accessibleObjectResponse.xPhraseStringProperty' ), [{"name":"value"},{"name":"variable"}] ),
        primaryPhrase: {
          predictAndPrimary: new FluentPattern<{ predictPhrase: FluentVariable, primaryPhrase: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_referenceLine_accessibleObjectResponse_primaryPhrase_predictAndPrimary', _.get( CalculusGrapherStrings, 'a11y.referenceLine.accessibleObjectResponse.primaryPhrase.predictAndPrimaryStringProperty' ), [{"name":"predictPhrase"},{"name":"primaryPhrase"}] ),
          predictUndefined: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_referenceLine_accessibleObjectResponse_primaryPhrase_predictUndefined', _.get( CalculusGrapherStrings, 'a11y.referenceLine.accessibleObjectResponse.primaryPhrase.predictUndefinedStringProperty' ), [{"name":"variable"}] ),
          predictValue: new FluentPattern<{ value: FluentVariable, variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_referenceLine_accessibleObjectResponse_primaryPhrase_predictValue', _.get( CalculusGrapherStrings, 'a11y.referenceLine.accessibleObjectResponse.primaryPhrase.predictValueStringProperty' ), [{"name":"value"},{"name":"variable"}] ),
          predictHiddenStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_referenceLine_accessibleObjectResponse_primaryPhrase_predictHidden', _.get( CalculusGrapherStrings, 'a11y.referenceLine.accessibleObjectResponse.primaryPhrase.predictHiddenStringProperty' ) ),
          primaryUndefined: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_referenceLine_accessibleObjectResponse_primaryPhrase_primaryUndefined', _.get( CalculusGrapherStrings, 'a11y.referenceLine.accessibleObjectResponse.primaryPhrase.primaryUndefinedStringProperty' ), [{"name":"variable"}] ),
          primaryValue: new FluentPattern<{ value: FluentVariable, variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_referenceLine_accessibleObjectResponse_primaryPhrase_primaryValue', _.get( CalculusGrapherStrings, 'a11y.referenceLine.accessibleObjectResponse.primaryPhrase.primaryValueStringProperty' ), [{"name":"value"},{"name":"variable"}] ),
          primaryHiddenStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_referenceLine_accessibleObjectResponse_primaryPhrase_primaryHidden', _.get( CalculusGrapherStrings, 'a11y.referenceLine.accessibleObjectResponse.primaryPhrase.primaryHiddenStringProperty' ) )
        },
        integralPhrase: {
          integralValue: new FluentPattern<{ value: FluentVariable, variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_referenceLine_accessibleObjectResponse_integralPhrase_integralValue', _.get( CalculusGrapherStrings, 'a11y.referenceLine.accessibleObjectResponse.integralPhrase.integralValueStringProperty' ), [{"name":"value"},{"name":"variable"}] ),
          integralHiddenStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_referenceLine_accessibleObjectResponse_integralPhrase_integralHidden', _.get( CalculusGrapherStrings, 'a11y.referenceLine.accessibleObjectResponse.integralPhrase.integralHiddenStringProperty' ) )
        },
        derivativePhrase: {
          derivativeUndefined: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_referenceLine_accessibleObjectResponse_derivativePhrase_derivativeUndefined', _.get( CalculusGrapherStrings, 'a11y.referenceLine.accessibleObjectResponse.derivativePhrase.derivativeUndefinedStringProperty' ), [{"name":"variable"}] ),
          derivativeValue: new FluentPattern<{ value: FluentVariable, variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_referenceLine_accessibleObjectResponse_derivativePhrase_derivativeValue', _.get( CalculusGrapherStrings, 'a11y.referenceLine.accessibleObjectResponse.derivativePhrase.derivativeValueStringProperty' ), [{"name":"value"},{"name":"variable"}] ),
          derivativeHiddenStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_referenceLine_accessibleObjectResponse_derivativePhrase_derivativeHidden', _.get( CalculusGrapherStrings, 'a11y.referenceLine.accessibleObjectResponse.derivativePhrase.derivativeHiddenStringProperty' ) )
        },
        secondDerivativePhrase: {
          secondDerivativeUndefined: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_referenceLine_accessibleObjectResponse_secondDerivativePhrase_secondDerivativeUndefined', _.get( CalculusGrapherStrings, 'a11y.referenceLine.accessibleObjectResponse.secondDerivativePhrase.secondDerivativeUndefinedStringProperty' ), [{"name":"variable"}] ),
          secondDerivativeValue: new FluentPattern<{ value: FluentVariable, variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_referenceLine_accessibleObjectResponse_secondDerivativePhrase_secondDerivativeValue', _.get( CalculusGrapherStrings, 'a11y.referenceLine.accessibleObjectResponse.secondDerivativePhrase.secondDerivativeValueStringProperty' ), [{"name":"value"},{"name":"variable"}] ),
          secondDerivativeHiddenStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_referenceLine_accessibleObjectResponse_secondDerivativePhrase_secondDerivativeHidden', _.get( CalculusGrapherStrings, 'a11y.referenceLine.accessibleObjectResponse.secondDerivativePhrase.secondDerivativeHiddenStringProperty' ) )
        }
      }
    },
    _comment_41: new FluentComment( {"comment":"Tangent Tool","associatedKey":"tangentTool"} ),
    tangentTool: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_tangentTool_accessibleName', _.get( CalculusGrapherStrings, 'a11y.tangentTool.accessibleNameStringProperty' ) ),
      accessibleHelpText: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_tangentTool_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.tangentTool.accessibleHelpTextStringProperty' ), [{"name":"variable"}] ),
      accessibleObjectResponse: {
        _comment_0: new FluentComment( {"comment":"Pattern with phrase placeholders that define the general form of the response.","associatedKey":"pattern"} ),
        _comment_1: new FluentComment( {"comment":"Pattern with phrase placeholders that define the general form of the response.","associatedKey":"pattern"} ),
        pattern: new FluentPattern<{ derivativePhrase: FluentVariable, slopePhrase: FluentVariable, xPhrase: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_tangentTool_accessibleObjectResponse_pattern', _.get( CalculusGrapherStrings, 'a11y.tangentTool.accessibleObjectResponse.patternStringProperty' ), [{"name":"derivativePhrase"},{"name":"slopePhrase"},{"name":"xPhrase"}] ),
        _comment_2: new FluentComment( {"comment":"Phrases that are substituted into referenceLineTool.accessibleObjectResponse.patterns.*","associatedKey":"xPhrase"} ),
        _comment_3: new FluentComment( {"comment":"Phrases that are substituted into tangentTool.accessibleObjectResponse.pattern","associatedKey":"xPhrase"} ),
        _comment_4: new FluentComment( {"comment":"Phrases that are substituted into areaUnderCurveTool.accessibleObjectResponse.pattern","associatedKey":"xPhrase"} ),
        xPhrase: new FluentPattern<{ value: FluentVariable, variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_tangentTool_accessibleObjectResponse_xPhrase', _.get( CalculusGrapherStrings, 'a11y.tangentTool.accessibleObjectResponse.xPhraseStringProperty' ), [{"name":"value"},{"name":"variable"}] ),
        slopePhrase: {
          slopeHiddenStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_tangentTool_accessibleObjectResponse_slopePhrase_slopeHidden', _.get( CalculusGrapherStrings, 'a11y.tangentTool.accessibleObjectResponse.slopePhrase.slopeHiddenStringProperty' ) ),
          slopeZeroValueStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_tangentTool_accessibleObjectResponse_slopePhrase_slopeZeroValue', _.get( CalculusGrapherStrings, 'a11y.tangentTool.accessibleObjectResponse.slopePhrase.slopeZeroValueStringProperty' ) ),
          slopePositiveValue: new FluentPattern<{ absoluteValue: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_tangentTool_accessibleObjectResponse_slopePhrase_slopePositiveValue', _.get( CalculusGrapherStrings, 'a11y.tangentTool.accessibleObjectResponse.slopePhrase.slopePositiveValueStringProperty' ), [{"name":"absoluteValue"}] ),
          slopeNegativeValue: new FluentPattern<{ absoluteValue: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_tangentTool_accessibleObjectResponse_slopePhrase_slopeNegativeValue', _.get( CalculusGrapherStrings, 'a11y.tangentTool.accessibleObjectResponse.slopePhrase.slopeNegativeValueStringProperty' ), [{"name":"absoluteValue"}] )
        },
        derivativePhrase: {
          derivativeValue: new FluentPattern<{ value: FluentVariable, variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_tangentTool_accessibleObjectResponse_derivativePhrase_derivativeValue', _.get( CalculusGrapherStrings, 'a11y.tangentTool.accessibleObjectResponse.derivativePhrase.derivativeValueStringProperty' ), [{"name":"value"},{"name":"variable"}] ),
          derivativeHiddenStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_tangentTool_accessibleObjectResponse_derivativePhrase_derivativeHidden', _.get( CalculusGrapherStrings, 'a11y.tangentTool.accessibleObjectResponse.derivativePhrase.derivativeHiddenStringProperty' ) )
        }
      }
    },
    _comment_42: new FluentComment( {"comment":"Area Under Curve Tool","associatedKey":"areaUnderCurveTool"} ),
    areaUnderCurveTool: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_areaUnderCurveTool_accessibleName', _.get( CalculusGrapherStrings, 'a11y.areaUnderCurveTool.accessibleNameStringProperty' ) ),
      accessibleHelpText: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_areaUnderCurveTool_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.areaUnderCurveTool.accessibleHelpTextStringProperty' ), [{"name":"variable"}] ),
      accessibleObjectResponse: {
        _comment_0: new FluentComment( {"comment":"Pattern with phrase placeholders that define the general form of the response.","associatedKey":"pattern"} ),
        _comment_1: new FluentComment( {"comment":"Pattern with phrase placeholders that define the general form of the response.","associatedKey":"pattern"} ),
        pattern: new FluentPattern<{ areaPhrase: FluentVariable, integralPhrase: FluentVariable, xPhrase: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_areaUnderCurveTool_accessibleObjectResponse_pattern', _.get( CalculusGrapherStrings, 'a11y.areaUnderCurveTool.accessibleObjectResponse.patternStringProperty' ), [{"name":"areaPhrase"},{"name":"integralPhrase"},{"name":"xPhrase"}] ),
        _comment_2: new FluentComment( {"comment":"Phrases that are substituted into referenceLineTool.accessibleObjectResponse.patterns.*","associatedKey":"xPhrase"} ),
        _comment_3: new FluentComment( {"comment":"Phrases that are substituted into tangentTool.accessibleObjectResponse.pattern","associatedKey":"xPhrase"} ),
        _comment_4: new FluentComment( {"comment":"Phrases that are substituted into areaUnderCurveTool.accessibleObjectResponse.pattern","associatedKey":"xPhrase"} ),
        xPhrase: new FluentPattern<{ value: FluentVariable, variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_areaUnderCurveTool_accessibleObjectResponse_xPhrase', _.get( CalculusGrapherStrings, 'a11y.areaUnderCurveTool.accessibleObjectResponse.xPhraseStringProperty' ), [{"name":"value"},{"name":"variable"}] ),
        integralPhrase: {
          integralValue: new FluentPattern<{ value: FluentVariable, variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_areaUnderCurveTool_accessibleObjectResponse_integralPhrase_integralValue', _.get( CalculusGrapherStrings, 'a11y.areaUnderCurveTool.accessibleObjectResponse.integralPhrase.integralValueStringProperty' ), [{"name":"value"},{"name":"variable"}] ),
          integralHiddenStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_areaUnderCurveTool_accessibleObjectResponse_integralPhrase_integralHidden', _.get( CalculusGrapherStrings, 'a11y.areaUnderCurveTool.accessibleObjectResponse.integralPhrase.integralHiddenStringProperty' ) )
        },
        areaPhrase: {
          areaZeroValueStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_areaUnderCurveTool_accessibleObjectResponse_areaPhrase_areaZeroValue', _.get( CalculusGrapherStrings, 'a11y.areaUnderCurveTool.accessibleObjectResponse.areaPhrase.areaZeroValueStringProperty' ) ),
          areaPositiveValue: new FluentPattern<{ absoluteValue: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_areaUnderCurveTool_accessibleObjectResponse_areaPhrase_areaPositiveValue', _.get( CalculusGrapherStrings, 'a11y.areaUnderCurveTool.accessibleObjectResponse.areaPhrase.areaPositiveValueStringProperty' ), [{"name":"absoluteValue"}] ),
          areaNegativeValue: new FluentPattern<{ absoluteValue: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_areaUnderCurveTool_accessibleObjectResponse_areaPhrase_areaNegativeValue', _.get( CalculusGrapherStrings, 'a11y.areaUnderCurveTool.accessibleObjectResponse.areaPhrase.areaNegativeValueStringProperty' ), [{"name":"absoluteValue"}] ),
          areaHiddenStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_areaUnderCurveTool_accessibleObjectResponse_areaPhrase_areaHidden', _.get( CalculusGrapherStrings, 'a11y.areaUnderCurveTool.accessibleObjectResponse.areaPhrase.areaHiddenStringProperty' ) )
        }
      }
    }
  }
};

export default CalculusGrapherFluent;

calculusGrapher.register('CalculusGrapherFluent', CalculusGrapherFluent);
