# Intro

React just turned 4 years old!
React has lived an adventurous life and has traveled to many lands.

* The Land of DOM,
* iOS Fortress,
* The Android Wilderness,
* Blessed Histories,
* Planet Arduino,
* Titaniumland,
* UWP,
* ...and more!

Today we’re going to write a renderer. (who? what?)

# `whoami`

@iamdustan of Webflow
Created Tiny React Renderer
Created React Hardware

# CounterApp

* DOM
* iOS
* Blessed
* 3D / VR
* Hardware

# Concepts

Host: your environment
Renderer: what you want to build
Reconciler: bridge to React internals

type Renderer = {
  render(
    element : React.Element<*>,
    container : any,
    callback ?: Function
  ) : void,

  // optionally more renderer specific things
  unmountComponentAtContainer ?: (container : any) => void,
};

type Reconciler<C, I, TI> = {
  createContainer(containerInfo : C) : OpaqueRoot,
  updateContainer(
    element : ReactNodeList,
    container : OpaqueRoot,
    parentComponent : ?ReactComponent<any, any, any>
  ) : void,
  performWithPriority(priorityLevel : PriorityLevel, fn : Function) : void,
  batchedUpdates<A>(fn : () => A) : A,
  unbatchedUpdates<A>(fn : () => A) : A,
  syncUpdates<A>(fn : () => A) : A,
  deferredUpdates<A>(fn : () => A) : A,
};

### Just Enough Fiber

Unit of Work
Begin UoW
Complete UoW
Commit UoW

### Getting a Reconciler

HostConfig (22 methods)

```
type HostConfig<T, P, I, TI, PI, C, CX, PL> = {

  getRootHostContext(rootContainerInstance : C) : CX,
  getChildHostContext(parentHostContext : CX, type : T) : CX,
  getPublicInstance(instance : I | TI) : PI,

  createInstance(
    type : T,
    props : P,
    rootContainerInstance : C,
    hostContext : CX,
    internalInstanceHandle : OpaqueHandle
  ) : I,
  appendInitialChild(parentInstance : I, child : I | TI) : void,
  finalizeInitialChildren(parentInstance : I, type : T, props : P, rootContainerInstance : C) : boolean,

  prepareUpdate(
    instance : I,
    type : T,
    oldProps : P,
    newProps : P,
    rootContainerInstance : C,
    hostContext : CX
  ) : null | PL,
  commitUpdate(
    instance : I,
    updatePayload : PL,
    type : T,
    oldProps : P,
    newProps : P,
    internalInstanceHandle : OpaqueHandle
  ) : void,
  commitMount(instance : I, type : T, newProps : P, internalInstanceHandle : OpaqueHandle) : void,

  shouldSetTextContent(props : P) : boolean,
  resetTextContent(instance : I) : void,
  shouldDeprioritizeSubtree(type : T, props : P) : boolean,

  createTextInstance(
    text : string,
    rootContainerInstance : C,
    hostContext : CX,
    internalInstanceHandle : OpaqueHandle
  ) : TI,
  commitTextUpdate(textInstance : TI, oldText : string, newText : string) : void,

  appendChild(parentInstance : I | C, child : I | TI) : void,
  insertBefore(parentInstance : I | C, child : I | TI, beforeChild : I | TI) : void,
  removeChild(parentInstance : I | C, child : I | TI) : void,

  scheduleAnimationCallback(callback : () => void) : number | void,
  scheduleDeferredCallback(callback : (deadline : Deadline) => void) : number | void,

  prepareForCommit() : void,
  resetAfterCommit() : void,

  useSyncScheduling ?: boolean,
};
```

# Let’s Build React Hardware

// TODO fill in all this sheesh

# Go forth and prosper

