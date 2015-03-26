{{{
    "title": "Fixed Point Arithmetic with AVR-GCC",
    "sections": []
}}}

Fixed Point Arithmetic with AVR-GCC
---------------------------------------------------------

The `int` datatype may be fine when your code only turn LEDs on and off. However, eventually you may need to work with real numbers. Since you know C from the inside-out, you will naturally just declare your type as `float` and call it a day. **Don't!**

If you are programming for the AVR, avoid double and float like the plague. Most microcontrollers from the AVR family (including all Atmegas) do not have a dedicated Floating-Point Unit (FPU), and each operation involving floating points are extremely costly. Before using a floating point number, ask yourself if you really need them. If you actually need to work with floating point numbers, you should consider using a fixed point instead. I will try to quickly explain what fixed points are and how to use them in avr-gcc.

### Fixed Point Numbers
I believe that the best way to understand fixed point numbers is to imagine how you would implement a real number in C. Well, technically real numbers, such as $\pi$, need infinite storage to represent them, so we will stick to a subset of rational numbers, namely those that can be represented by our choice of fixed point numbers.

Anyway, consider an integer (for example, 5) represented by a byte:

|     Bit 7      | Bit 6 | Bit 5 | Bit 4 | Bit 3 | Bit 2 | Bit 1 | Bit 0 |
|:--------------:|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|
|        0      |   0   |   0   |   0   |   0   |   1   |   0   |   1   |
|    $0*2^7$     |$0*2^6$|$0*2^5$|$0*2^4$|$0*2^3$| $1*2^2$ |$0*2^1$|$ 1*2^0 $|

Now suppose that, for whatever reason, you only care whether your number has a 0.5. For example, you are interested on representing numbers such as 5.5, 1.0, 1.5, etc. An obvious implementation is to use `Bit 0` of the integer byte to indicate whether the number has a 0.5 or not. That is, to represent 5.5, you would have

| Bit 7 | Bit 6 | Bit 5 | Bit 4 | Bit 3 | Bit 2 | Bit 1 | . |Bit 0  |
|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|:-:|:------:|
|   0   |   0   |   0   |   0   |   1   |   0   |   1   | . |   1    |
|$0*2^6$|$0*2^5$|$0*2^4$|$0*2^3$|$ 1*2^2 $|$0*2^1$| $1*2^0$ | . |$1*2^{-1}$|

Notice how we can easily calculate 5.5 by adding $2^{-1}$ to 5, where $-1$ just means its position is immediately after the dot. Since we are using 7 bits to represent the integer part and 1 bit to represent the fractionary part, we say this is a 7.1 fixed-point representation. If you needed a bit more precision, you could instead dedicate two bits to the fractionary part of your number. Alternatively, if all you cared about was numbers between 0 and 1, such as 0.8125, you could instead dedicate the entire byte for the fractionary part

| . | Bit 7 | Bit 6 | Bit 5 | Bit 4 | Bit 3 | Bit 2 | Bit 1 | Bit 0  |
|:-:|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|:------:|
| . |   1    |   1    |    0   |    1   |    0   |    0   |    0   |   0    |
| . |$1*2^{-1}$|$1*2^{-2}$|$0*2^{-3}$|$1*2^{-4}$|$0*2^{-5}$|$0*2^{-6}$|$0*2^{-7}$|$0*2^{-8}$|

That is, $2^{-1} + 2^{-2}+2^{-4}  = 0.8125$. Similarly, since we are using 0 bits to represent the integer part and 8 bits to represent the fractionary part, we say this is a 0.8 fixed-point representation.

Of course, you could have dedicated an entire byte for the integer part of the number and another byte for the fractionary part. This is exactly how fixed-point numbers are usually represented.

 The advantage of using fixed-point numbers such as this representation is that it is trivial to perform most operations on them. For example, two fixed-point numbers using the same representation can be added as if they were normal integers, making calculations extremely fast compared to floating point operations in processors without a FPU. It is also nice to notice that if you need to multiply or divide a fixed-point number by a power of 2, you would just shift left or right respectively.

Also, notice that fixed point numbers offer greater precision than floating point numbers. However, they certainly lack in range. For most operations you may need in a microcontroller, fixed point numbers are perfectly fine, if not better than floating point numbers.

### AVR GCC
When I started using fixed-point numbers in the AVR, I wrote a very simple library to perform most common operations. However, I quickly jumped to a more polished library such as the [avrfix](http://avrfix.sourceforge.net/).

Recently, however, external libraries are not needed anymore. Since version 4.8, avr-gcc supports fixed-point arithmetic according to ISO/IEC TR 18037 standard, with the data-types `_Fract` and `_Accum`. You may need to recompile avr-gcc giving `./configure` the flag `--enable-fixed-point` to enable fixed-point math. You will also need to include the `stdfix.h` header in your code.

avr-gcc supports the following data-types

| Type | sizeof | unsigned | signed |
| :-- : | :--:|:--:|:--:|
| **_Fract** |
| short _Fract | 1 | 0.8 | $\pm$0.7 |
| _Fract | 2 | 0.16 | $\pm$0.15 |
| long _Fract | 4 | 0.32 | $\pm$0.31 |
| long long _Fract | 8 | 0.64 | $\pm$0.63 |
| **_Accum** |
| short _Accum | 2 | 8.8 | $\pm$8.7 |
| _Accum | 4 | 16.16 | $\pm$16.15 |
| long _Accum | 8 | 32.32 | $\pm$32.32 |
| long _Accum | 8 | 16.48 | $\pm$16.48 |
