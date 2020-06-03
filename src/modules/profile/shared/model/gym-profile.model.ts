export interface IGymProfileForm {
  avatarBase64: string;
  name: string;
  phone: string;
}

export interface IGymProfileQuery {
  uuid: string;
  name: string;
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
  public readonly branches: Array<{
    uuid: string;
    address?: {
      country: string;
    };
  }>;

  constructor(data?: IGymProfileQuery | null) {
    this.uuid = data ? data.uuid : '';
    this.name = data ? data.name : '';
    this.branches = data && data.branches ? data.branches : [];
  }

  public get gymProfileForm(): IGymProfileForm {
    return {
      avatarBase64: '',
      name: this.name,
      phone: ''
    };
  }
}
