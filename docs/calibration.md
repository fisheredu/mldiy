# Calibration

## On Calibration of Modern Neural Networks (ICML, 2017)

https://fernandoperezc.github.io/Advanced-Topics-in-Machine-Learning-and-Data-Science/Fluri.pdf
https://proceedings.mlr.press/v70/guo17a.html

Perfect calibration

$$
\Pr(\hat{Y} = Y \mid \hat{P} = p) = p
$$

Model calibration

$$
\mathbb{E}\left[ \lvert \Pr(\hat{Y} = Y \mid \hat{P} = p) - p \rvert \right]
$$
