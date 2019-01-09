import Renderer from '../../../src/renderer/Renderer';
import { RTT_WIDTH } from '../../../src/renderer/Renderer';

describe('src/renderer/Renderer', () => {
    describe('WebGL errors', () => {
        const webGLWithNoExtensions = {
            getExtension: () => null
        };
        const webGLWithInvalidParameter = {
            getExtension: () => ({}),
            getParameter: () => RTT_WIDTH - 1
        };

        const canvasWithNoWebGL = { getContext: () => null };
        const canvasWithNoExtensions = {
            getContext: () => webGLWithNoExtensions
        };
        const canvasWithInvalidParameter = {
            getContext: () => webGLWithInvalidParameter
        };

        describe('Constructor', () => {
            it('should throw when there is no webgl context', () => {
                expect(() => {
                    new Renderer(canvasWithNoWebGL);
                }).toThrowError(/WebGL 1 is unsupported/);
            });

            it('should throw when the "OES_texture_float" extension is not available', () => {
                expect(() => {
                    new Renderer(canvasWithNoExtensions);
                }).toThrowError(/WebGL extension 'OES_texture_float' is unsupported/);
            });

            it('should throw when the "MAX_RENDERBUFFER_SIZE" parameter is not big enough', () => {
                expect(() => {
                    new Renderer(canvasWithInvalidParameter);
                }).toThrowError(/WebGL parameter 'gl\.MAX_RENDERBUFFER_SIZE' is below the requirement.*/);
            });
        });

        describe('initialize', () => {
            it('should throw when the "OES_texture_float" extension is not available', () => {
                expect(() => {
                    const renderer = new Renderer();
                    renderer.initialize(webGLWithNoExtensions);
                }).toThrowError(/WebGL extension 'OES_texture_float' is unsupported/);
            });

            it('should throw when the "MAX_RENDERBUFFER_SIZE" parameter is not big enough', () => {
                expect(() => {
                    const renderer = new Renderer();
                    renderer.initialize(webGLWithInvalidParameter);
                }).toThrowError(/WebGL parameter 'gl\.MAX_RENDERBUFFER_SIZE' is below the requirement.*/);
            });
        });
    });
});
