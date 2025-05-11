import { View } from "react-native";
import React from "react";
import { TAdvert } from "@/types/advert";
import { PublishAdvert } from "../UI/PublishAdvert";
import { UnpublishAdvert } from "../UI/UnpublishAdvert";

type AdvertPublicityLayoutProps = {
  advert: TAdvert["advert"];
};

export const AdvertPublicityLayout: React.FC<AdvertPublicityLayoutProps> = (
  props
) => {
  const isPublished: boolean = props.advert.isPublished;

  return (
    <View>
      {!isPublished && <PublishAdvert advert={props.advert} />}
      {isPublished && <UnpublishAdvert advert={props.advert} />}
    </View>
  );
};
