import { describe, it, expect, vi } from 'vitest'

import { MouseObserver } from './MouseObserver';
import { RotationCalculator } from './RotationCalculator';

describe('MouseObserver', () => {

  const mouseActions: RotationCalculator = {
    onStart: vi.fn(),
    onUpdate: vi.fn(),
    calculateAngle: vi.fn(),
  }

  const tested = new MouseObserver(mouseActions)

  it('should handle mouse down event', () => {
    const mockEvent = { clientX: 100, clientY: 200 } as PointerEvent

    tested.handlePointerDown(mockEvent)

    expect(mouseActions.onStart).toHaveBeenCalledWith(100, 200)
  });

  it('should handle mouse up event', () => {
    const mockEvent = { clientX: 100, clientY: 200 } as PointerEvent

    tested.handlePointerUp(mockEvent);

    expect(mouseActions.onUpdate).toHaveBeenCalledWith(100, 200);
  });
});
