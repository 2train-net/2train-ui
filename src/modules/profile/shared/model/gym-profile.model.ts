export interface IGymProfileForm {
  avatarBase64: string;
  name: string;
  phone: string;
}

export interface IUpdateGymProfileForm {
  avatarBase64?: string;
  name?: string;
  phone?: string;
}

export interface IGymProfileQuery {
  uuid: string;
  name: string;
  phone: string;
  avatar?: string | null;
  branches?: Array<{
    uuid: string;
    address?: {
      country: string;
    };
  }> | null;
}

export class GymProfile {
  public readonly uuid: string;
  public readonly name: string;
  public readonly phone: string;
  public readonly avatar: string;
  public readonly branches: Array<{
    uuid: string;
    address?: {
      country: string;
    };
  }>;

  constructor(data?: IGymProfileQuery | null) {
    this.uuid = data ? data.uuid : '';
    this.name = data ? data.name : '';
    this.phone = data ? data.phone : '';
    this.avatar = data && data.avatar ? data.avatar : '';
    this.branches = data && data.branches ? data.branches : [];
  }

  public get gymProfileForm(): IGymProfileForm {
    return {
      avatarBase64: this.avatar,
      name: this.name,
      phone: this.phone
    };
  }
}
