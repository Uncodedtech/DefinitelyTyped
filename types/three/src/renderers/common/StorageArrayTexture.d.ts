import { Wrapping } from "../../constants.js";
import { Texture } from "../../textures/Texture.js";

/**
 * This special type of texture is intended for compute shaders.
 * It can be used to compute the data of a texture with a compute shader.
 *
 * Note: This type of texture can only be used with `WebGPURenderer`
 * and a WebGPU backend.
 */
declare class Storage3DTexture extends Texture {
    /**
     * This flag can be used for type testing.
     *
     * @default true
     */
    readonly isStorageTexture: true;

    /**
     * Constructs a new storage texture.
     *
     * @param {number} [width=1] - The storage texture's width.
     * @param {number} [height=1] - The storage texture's height.
     * @param {number} [depth=1] - The storage texture's depth.
     */
    constructor(width?: number, height?: number, depth?: number);
}

export default Storage3DTexture;
