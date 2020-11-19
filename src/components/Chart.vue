<template>
  <div class="chart">
    <div class="chart__container">
      <div class="radialProgressBar" :class="progressClass">
        <svg
          class="svg"
          :viewBox="viewBox"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <circle
              class="base"
              :cx="cx"
              :cy="cy"
              :r="trackRadius"
              :stroke-width="baseStrokeWidth"
              stroke-linecap="round"
              :stroke-dashoffset="baseOffset"
              :stroke-dasharray="circumference"
              fill="transparent"
            />
            <circle
              class="active"
              :cx="cx"
              :cy="cy"
              :r="trackRadius"
              :stroke-width="strokeWidth"
              stroke-linecap="round"
              :stroke-dashoffset="dashOffset"
              :stroke-dasharray="circumference"
              fill="transparent"
            />
           
          </g>
        </svg>
        <div class="overlay">
          <div v-if="label" class="overlay__label">{{ label }}</div>
          <div v-if="displayValue" class="overlay__value">
            {{ visualValue }}{{ suffix }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Chart",
  props: {
    label: String,
    displayValue: Number,
    suffix: String,
    viewBox: {type: String, default: "0 0 100 100"},
    strokeWidth: { type: Number, default: 10 },
    radius: { type: Number, default: 50 },
    cx: { type: Number, default: 50 },
    cy: { type: Number, default: 50 },
  },
  computed: {
    progressClass: function () {
      var css = this.displayValue
        ? "progress-" + String(Math.floor(this.displayValue))
        : "";
      return css;
    },
    baseStrokeWidth: function () {
      return 1 * this.strokeWidth;
    },
    circumference: function () {
      return 2 * Math.PI * this.trackRadius;
    },
    trackRadius: function () {
      return this.radius - this.strokeWidth / 2;
    },
    dashArray: function () {
      const percent = (this.displayValue / 100) * this.circumference;
      return percent;
    },
    dashOffset: function () {
      const percent = ((100 - this.displayValue) / 100) * this.circumference;
      return percent;
    },
    visualValue: function () {
      return this.displayValue.toFixed(1);
    },
    baseOffset: function () {
      const percent = this.circumference * 0.25;
      return percent;
    },
  },
};
</script>

<style scoped lang="scss">
$bar-colors: (rgb(33, 232, 2), rgb(249, 200, 39), rgb(211, 14, 50));
$base-color: #ccc;
$mask-color: #000;
$text-color: #fff;
$chart-size: 90%;

.chart {
  position: relative;
  margin: 0;
  height: 0;
  padding: 100% 0 0;
  overflow: hidden;
  &__container {
    position: absolute;
    width: $chart-size;
    height: $chart-size;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
  }
}

svg.svg {
  position: absolute;
  z-index: 3;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  g {
    transform-origin: 50% 50%;
    transform: rotateZ(135deg);
  }

  circle {
    transition: all 250ms ease;
    transform-origin: 50% 50%;
    fill: transparent;
    &.base {
      z-index: 1;
      stroke: rgba($text-color, 0.25);
    }
    &.active {
      z-index: 2;
    }
  }
}

.radialProgressBar {
  border-radius: 50%;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  // background: $base-color;
  margin: 0;
  transition: all 200ms ease;

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  .overlay {
    border-radius: 50%;
    width: 80%;
    height: 80%;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    text-shadow: 1px 1px 5px rgba($base-color, 0.5);
    text-align: center;
    color: $text-color;
    &__label {
      line-height: 1.35;
      font-size: 6vw;
    }
    &__value {
      line-height: 1.2;
      font-size: 7vw;
    }
  }
}
@for $i from 0 to 101 {
  $rotation: $i * 360 / 100;
  $bar-color: nth($bar-colors, 1);

  .progress-#{$i} {
    @if $i > 80 {
      $bar-color: nth($bar-colors, 3);
    } @else if ($i > 50) {
      $bar-color: nth($bar-colors, 2);
    }
    svg circle.active {
      stroke: rgba($bar-color, 0.85);
    }
    // @if $i <= 50 {
    //   background-image: linear-gradient(90deg, $base-color 50%, transparent 50%),
    //     linear-gradient(#{$rotation - 90}deg, $base-color 50%, $bar-color 50%);
    // } @else if $i < 100 {
    //   background-image: linear-gradient(
    //       #{$rotation + 90}deg,
    //       $bar-color 50%,
    //       transparent 50%
    //     ),
    //     linear-gradient(90deg, $base-color 50%, $bar-color 50%);
    // } @else {
    //   background-image: linear-gradient(90deg, transparent 50%, $bar-color 50%),
    //     linear-gradient(90deg, $bar-color 50%, transparent 50%);
    // }
  }
}
</style>