# Plan: Chart Rotation Plugin

## TL;DR
Create a new plugin (`chartRotationPlugin`) that allows users to rotate the entire doughnut chart by clicking and dragging on the canvas. 

**Phase 1 (Debug/Validation)**: Add mouse event listeners with console logging to validate gesture detection, canvas click points, and boundary behavior.

**Phase 2+**: Implement rotation angle calculation and apply rotation transforms to the chart.

## Requirements

- **Rotation target**: Entire chart (applies rotation transform to canvas context)
- **State persistence**: Rotation angle saved and applied to subsequent renders
- **Constraints**: Free rotation (no angle limits or snapping)

## Steps

### Phase 1: Add Mouse Event Listeners & Debug Console Output

1. Create `src/chart/chartRotationPlugin/chartRotationPlugin.ts` (initial version)
   - Implement `afterInit` hook to set up mouse event listeners
   - Add canvas `mousedown` listener:
     - Log to console: `"Gesture start: mouse down at (x, y), canvas center at (centerX, centerY)"`
     - Capture and log clicked point coordinates relative to canvas
     - Verify point is within chart canvas bounds
   - Add document `mousemove` listener (document-level to capture moves outside canvas):
     - Log current mouse position: `"Mouse move: (x, y)"`
     - Detect and log when mouse leaves canvas area: `"Mouse left canvas"`
   - Add document `mouseup` listener:
     - Log gesture end: `"Gesture end: mouse up at (x, y)"`
   - Add `mouseleave` listener on canvas:
     - Log: `"Mouse left canvas area"`
   - Purpose: Validate that click points are correctly identified, mouse positions are tracked accurately, and canvas boundary behavior is correct

### Phase 2: Create Rotation Angle Calculation Function

2. Create `src/chart/chartRotationPlugin/chartRotationAngle.ts`
   - Function: `calculateRotationDelta(startX: number, startY: number, currentX: number, currentY: number, centerX: number, centerY: number): number`
   - Returns the angle change (in radians) between start and current mouse positions relative to chart center
   - Uses `Math.atan2()` to calculate angles from chart center to both points
   - Implementation:
     - Calculate vector from center to start position → `startAngle = atan2(startY - centerY, startX - centerX)`
     - Calculate vector from center to current position → `currentAngle = atan2(currentY - centerY, currentX - centerX)`
     - Return `currentAngle - startAngle` (positive = counter-clockwise)

3. Create `src/chart/chartRotationPlugin/chartRotationAngle.test.ts`
   - Test cases:
     - Rotation from 0° to 90° (quarter turn counter-clockwise) → expect Math.PI/2
     - Rotation from 90° to 0° (quarter turn clockwise) → expect -Math.PI/2
     - Rotation from 45° to 315° (270° clockwise) → expect appropriate negative delta
     - Full rotation and multi-turn scenarios
     - Small deltas (sub-degree movements)
     - Rotation across 0° boundary (e.g., from -170° to 170°)
   - Use `vitest` + `expect(...).toBeCloseTo()` for floating point comparisons

4. Update `src/chart/chartRotationPlugin/chartRotationPlugin.ts` (enhance Phase 1 version)
   - Structure (following `translatedLabelsPlugin` pattern):
     ```typescript
     type RotationState = {
       currentRotation: number  // cumulative rotation in radians
       isDragging: boolean
       dragStartX: number
       dragStartY: number
     }
     ```
   - Plugin object:
     - `id: 'chartRotation'`
     - `afterInit` hook: Initialize state, set up event listeners (upgrade from Phase 1 with rotation logic)
     - `afterDatasetsDraw` hook: Apply rotation transform to canvas

5. Enhance **`afterInit` hook** with rotation calculation:
   - Initialize rotation state: `{ currentRotation: 0, isDragging: false }`
   - Keep existing console logging from Phase 1, add:
   - Add canvas `mousedown` listener:
     - Set `isDragging = true`, capture start position and chart center
   - Add document `mousemove` listener (document-level to handle dragging outside canvas):
     - Calculate delta using `calculateRotationDelta()`
     - Update `currentRotation += delta`
     - Call `chart.update()` to trigger re-render
   - Add document `mouseup` listener:
     - Set `isDragging = false`
   - Store listeners in plugin scope so they can be cleaned up if needed

6. Implement **`afterDatasetsDraw` hook**:
   - Access canvas context: `const ctx = chart.ctx`
   - Save context state: `ctx.save()`
   - Get chart center: use `chart.chartArea.left + chart.chartArea.width/2` and `chart.chartArea.top + chart.chartArea.height/2`
   - Apply rotation transform:
     ```typescript
     ctx.translate(centerX, centerY)
     ctx.rotate(currentRotation)
     ctx.translate(-centerX, -centerY)
     ```
   - Redraw chart elements (or use Chart.js's built-in re-render mechanism)
   - Restore context: `ctx.restore()`

### Phase 4: Register Plugin and Integration

7. Update `src/chart/chart.ts`:
   - Import: `import { chartRotationPlugin } from './chartRotationPlugin/chartRotationPlugin'`
   - Add `chartRotationPlugin` to plugins array in chart config (after or before other plugins)

8. Create `src/chart/chartRotationPlugin/README.md` (optional, for documentation):
   - Describe plugin purpose
   - Document interaction (click-drag to rotate)
   - Note that rotation is cumulative and persists

## Relevant Files

- `src/chart/chart.ts` — Plugins array registration point
- `src/chart/rotatedLabelsPlugin/rotatedLabelsPlugin.ts` — Pattern for canvas manipulation
- `src/chart/translatedLabelsPlugin/translatedLabelsPlugin.ts` — Pattern for event handling and state management
- `src/chart/rotatedLabelsPlugin/rotatedLabelsRotation.ts` — Pattern for calculation functions with unit tests

## Verification

### Phase 1 - Console Logging & Gesture Detection
1. **Plugin initializes**: Chart renders without errors after adding plugin to plugins array
2. **Console logging works**: Open browser DevTools console and verify all log messages appear:
   - "Gesture start" when clicking on canvas
   - "Mouse move" messages as you move the mouse
   - "Mouse left canvas" when dragging outside canvas bounds
   - "Gesture end" when releasing mouse
3. **Canvas coordinates accurate**: Verify clicked points log coordinates that match actual click location
4. **Canvas boundary detection**: Test that boundary behavior is correctly logged when mouse leaves canvas area
5. **Multiple gestures**: Verify console shows correct start/end for multiple consecutive click-drag sequences

### Phase 2 - Rotation Angle Calculation
1. **Unit tests pass**: Run `npm test` (or `vitest`) — `chartRotationAngle.test.ts` should pass all test cases
2. **Angle calculation accuracy**: Verify calculateRotationDelta returns correct radians for known angle transitions

### Phase 3 - Full Rotation Implementation
1. **Mouse drag interaction**: Click on chart, drag mouse → chart visually rotates smoothly
2. **Rotation persists**: Release mouse → rotation angle is maintained (dragging further rotates from new angle)
3. **Smooth tracking**: Move mouse continuously and verify smooth, responsive rotation
4. **State cleanup**: Optional: verify rotation state doesn't leak between chart instances

## Decisions

- **Calculation function isolation**: Angle delta calculated separately from event handling (allows unit testing without DOM)
- **State management**: Rotation state stored in plugin closure (no global state, follows translatedLabelsPlugin pattern)
- **Mouse listeners**: Added at document level (not canvas-only) to handle drag-out-and-back interactions smoothly
- **Transform approach**: Applied in `afterDatasetsDraw` after all data is drawn (ensures all chart elements rotate together)
- **No persistence across page reloads**: Rotation state is in-memory; does not save to localStorage (can be added later if needed)
