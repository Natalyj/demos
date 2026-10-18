export const renderClearPass = (
    device: GPUDevice,
    context: GPUCanvasContext,
    clearColor: GPUColor,
) => {
    const commandEncoder = device.createCommandEncoder();
    const passEncoder = commandEncoder.beginRenderPass({
        colorAttachments: [
            {
                view: context.getCurrentTexture().createView(),
                clearValue: clearColor,
                loadOp: 'clear',
                storeOp: 'store',
            },
        ],
    });
    passEncoder.end();
    device.queue.submit([commandEncoder.finish()]);
};
