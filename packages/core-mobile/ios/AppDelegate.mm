#import "AppDelegate.h"
#import "RNFBAppCheckModule.h"
#import <Firebase.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTLinkingManager.h>
#import <React/RCTRootView.h>
#import "RNBootSplash.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [RNFBAppCheckModule sharedInstance];
  [FIRApp configure];
  self.moduleName = @"AvaxWallet";
  
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
  
  [self loadRocketSimConnect];
  
  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (UIView *)createRootViewWithBridge:(RCTBridge *)bridge
                          moduleName:(NSString *)moduleName
                           initProps:(NSDictionary *)initProps
{
  RCTRootView * rootView = (RCTRootView *)[super createRootViewWithBridge:bridge moduleName:moduleName initProps:initProps];
  [RNBootSplash initWithStoryboard:@"BootSplash" rootView:rootView];  
  return rootView;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self getBundleURL];
}

- (NSURL *)getBundleURL
{
#if DEBUG
  // in order for sourcemap to work with Safari debugging, we replace [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"]; with the statement below
  return [NSURL URLWithString:[[[[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"] absoluteString] stringByAppendingString:@"&inlineSourceMap=true" ]];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}


- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  return [RCTLinkingManager application:application openURL:url options:options];
}

- (BOOL)application:(UIApplication *)application continueUserActivity:(nonnull NSUserActivity *)userActivity
 restorationHandler:(nonnull void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler
{
  return [RCTLinkingManager application:application
                   continueUserActivity:userActivity
                     restorationHandler:restorationHandler];
}

- (void)loadRocketSimConnect {
#if DEBUG
    NSString *frameworkPath = @"/Applications/RocketSim.app/Contents/Frameworks/RocketSimConnectLinker.nocache.framework";
    NSBundle *frameworkBundle = [NSBundle bundleWithPath:frameworkPath];
    NSError *error = nil;

    if (![frameworkBundle loadAndReturnError:&error]) {
        NSLog(@"Failed to load linker framework: %@", error);
        return;
    }

    NSLog(@"RocketSim Connect successfully linked");
#endif
}

@end
