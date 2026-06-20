import { describe, it, expect, vi } from 'vitest'

import { MouseObserver } from './MouseObserver';
import { RotationCalculator } from './RotationCalculator';

describe('MouseObserver', () => {

  const mouseActions: RotationCalculator = {
    onStart: vi.fn(),
    onUpdate: vi.fn()
  }

  const tested = new MouseObserver(mouseActions)

  it('should track mouse position on move', () => {
    const mockEvent = { clientX: 100, clientY: 200 } as MouseEvent

    tested.handleMouseDown(mockEvent)

    expect(mouseActions.onStart).toHaveBeenCalledWith(100, 200)
  });

  it('should update once for mouse up', () => {
    const mockEvent = { clientX: 100, clientY: 200 } as MouseEvent

    tested.handleMouseUp(mockEvent);

    expect(mouseActions.onUpdate).toHaveBeenCalledWith(100, 200);
  });
});
