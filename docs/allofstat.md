# AoS

## Chapter 6: Models, Statistical Inference and Learning

In frequentist statistics, the true parameter is always fixed. What is random is the data.

Take example 6.15, the sample proportion $\hat{p}_n$ is a random variable (it changes every time you flip a new batch of coins). Therefore, the interval $C_n = (\hat{p}_n - \epsilon_n, \hat{p}_n + \epsilon_n)$ is a random interval.

Because $p$ is fixed, it is very easy to misread $\mathbb{P}(p \in C_n)$ as "the probability that $p$ lands inside $C_n$." That is the exact trap Example 6.14 is warning you about. Instead, it should be read as: "The probability that the random interval $C_n$ will successfully trap the fixed value $p$." The randomness belongs entirely to $C_n$. Think of $p$ as a stationary target and $C_n$ as a net you are throwing. The probability applies to the net hitting the target, not the target jumping into the net.

In the real world, you do not know the true value of the parameter. A valid Frequentist confidence interval must be guaranteed to work no matter what the true value happens to be. When the text says "for every $p$", it is making a strong guarantee: Whether the true coin bias is 0.1, 0.5, or 0.9, the mathematical procedure used to generate $C_n$ will trap that true value at least $(1 - \alpha)\%$ of the time
