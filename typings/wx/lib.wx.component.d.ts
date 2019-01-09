/**
 * author: alan
 */

declare namespace Component {

  interface ComponentInstanceBaseProps<D extends IAnyObject = any> {
    properties?: {
      type: any,
      value?: any,
      observer?() : void
    }

    options?: any

    releations?: any

    externalClasses?: string[]

    data?: D

    setData?<K extends keyof D>(
      /** 这次要改变的数据
       *
       * 以 `key: value` 的形式表示，将 `this.data` 中的 `key` 对应的值改变成 `value`。
       *
       * 其中 `key` 可以以数据路径的形式给出，支持改变数组中的某一项或对象的某个属性，如 `array[2].message`，`a.b.c.d`，并且不需要在 this.data 中预先定义。
       */
      data: D | Pick<D, K> | IAnyObject,
      /** setData引起的界面更新渲染完毕后的回调函数，最低基础库： `1.5.0` */
      callback?: () => void
    ): void

    behaviors?: string[]
  }

  interface ComponentInstance<D extends IAnyObject = any, T extends IAnyObject = any> extends ComponentInstanceBaseProps<D> {
    methods?: IAnyObject

    created?(): void

    attached?(): void

    ready?(): void

    moved?(): void

    detached?(): void

    lifetimes?: {
      created?(): void

      attached?(): void

      ready?(): void

      moved?(): void

      detached?(): void

      show?(): void

      hide?(): void

      resize?(size: IAnyObject): void
    }

    error?(err: IAnyObject): void
  }

  interface ComponentConstructor {
    <D extends IAnyObject, T extends IAnyObject & ComponentInstance>(
      options: ComponentInstance<D, T> & T
    ): void
  }
}

declare const Component: Component.ComponentConstructor
